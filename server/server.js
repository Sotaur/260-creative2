import { DataAccess } from "./DataAccess";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("dist"));

let listings = [];
let userStatistics = {
    user: 0,
    seller: 0
};

let dashboardUsers = {};
let id = 0;

const listingCollections = process.env.LISTING_COLLECTIONS.split(',');
const userCollection = process.env.USER_COLLECTION;

const dbURL = 'mongodb://' + process.env.DATABASE_USERNAME + ':' + process.env.DATABASE_PASS +
    '@' + process.env.DATABASE_HOST + '/' + process.env.DATABASE_NAME;
const cleanListings = () => {
    listings = listings.map(listing => {
        let numPrice = 0;
        if (listing["price"]) {
            numPrice = parseFloat(
                listing["price"].replace(/,/g, "").replace(/\$/g, "")
            );
        }
        let numSqFt = 0;
        if (listing["sqft"]) {
            numSqFt = parseFloat(listing["sqft"].replace(/,/g, ""));
        }
        return {
            price: numPrice,
            sqFootage: numSqFt,
            age: listing["timeOnline"] ? listing["timeOnline"] : "Unknown",
            city: listing["city"]
        };
    });
};

const getListings = () => {
    DataAccess.connect(dbURL, err => {
        if (err) {
            console.log(err);
            console.log("Cannot connect to database, exiting");
            process.exit(1);
        } else {
            for (let i = 0; i < listingCollections.length; i++) {
                DataAccess.getCollectionData(listingCollections[i], data => {

                    listings = listings.concat(data);
                    console.log(listings.length);
                    cleanListings();
                });
            }
        }
    });
};

const getUserStatistics = () => {
    let users = [];
    DataAccess.connect(dbURL, err => {
        if (err) {
            console.log(err);
            console.log("Cannot connect to database, exiting");
            process.exit(1);
        } else {
            DataAccess.getCollectionData(userCollection, data => {
                data.forEach(user => {
                    let type = user["type"];
                    if (type) {
                        if (type === "user") {
                            userStatistics.user++;
                        } else if (type === "seller") {
                            userStatistics.seller++;
                        }
                    }
                });
            });
        }
    });
};

getListings();
getUserStatistics();

app.get("/api/listing", (req, res) => {
    let userID = req.body.id;
    let toSend = [];
    if (userID) {
        toSend = toSend.concat(dashboardUsers[userID].listings);
    }
    res.send(toSend.concat(listings));
});

app.get("/api/user-stats", (req, res) => {
    res.send(userStatistics);
});

app.put("/api/listing", (req, res) => {
    let listing = req.body.listing;
    let userID = req.body.id;
    if (listing && userID) {
        dashboardUsers[userID].listings.push(listing);
    }
    res.send(dashboardUsers[userID]);
});

app.post("/api/user", (req, res) => {
    id = id + 1;
    let user = {
        id: id,
        listings: []
    };
    dashboardUsers[id] = user;
    //console.log(dashboardUsers);
    res.send(user);
});

app.delete("/api/listing/:id", (req, res) => {
    console.log(req.params.id);
    if (req.params.id) {
        dashboardUsers[req.params.id].listings = [];
        res.send(dashboardUsers[req.params.id]);
    } else {
        res.send("Error: User not found");
    }
});

app.delete("/api/user-stats", (req, res) => {
    userStatistics = {
        user: 0,
        seller: 0
    };
    getUserStatistics();
});

app.listen(3141, () => console.log("Server listening on port 3141!"));