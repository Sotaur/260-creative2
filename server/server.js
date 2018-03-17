import { DataAccess } from './DataAccess';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'))

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
    listings = listings.map((listing) => {
        let numPrice = parseFloat(
            listing["price"].replace(/,/g, "").replace(/\$/g, "")
        );
        let numSqFt = parseFloat(listing["sqft"].replace(/,/g, ''));
        return {
            price: numPrice,
            sqFootage: numSqFt,
            age: listing["timeOnline"],
            city: listing["city"]
        }
    })
}

const getListings = () => {
    DataAccess.connect(dbURL, (err) => {
        if (err) {
            console.log(err);
            console.log("Cannot connect to database, exiting");
            process.exit(1);
        } else {
            for (let i = 0; i < listingCollections.length; i++) {
                DataAccess.getCollectionData(listingCollections[i], (data) => {
                    listings.concat(data);
                });
            }
        }
    });
    cleanListings();
}

const getUserStatistics = () => {
    let users = [];
    DataAccess.connect(dbURL, (err) => {
        if (err) {
            console.log(err);
            console.log("Cannot connect to database, exiting");
            process.exit(1);
        } else {
            DataAccess.getCollectionData(userCollection, (data) => {
                users.concat(data);
            });
        }
    });
    users.forEach((user) => {
        let type = user["type"];
        if (type) {
            if (type === "user") {
                userStatistics.user++;
            } else if (type === "seller") {
                userStatistics.seller++;
            }
        }
    });
}

getListings();
getUserStatistics();

app.get('/api/listing', (req, res) => {
    let userID = req.body.id;
    let toSend = []
    if (userID) {
        toSend.concat(dashboardUsers[userID].listings);
    }
    toSend.concat(listings);
    res.send(toSend);
});

app.get('/api/listing/:city', (req, res) => {
    let id = req.body.id;
    let toSend = []
    if (id) {
        toSend.concat(dashboardUsers[id].listings);
    }
    toSend.concat(listings);
    res.send(toSend.filter((listing) => {
        return listing.city === req.params.city;
    }));
});

app.get('/api/user-stats', (req, res) => {
    res.send(userStatistics);
})

app.post('/api/listing', (req, res) => {
    let listing = req.body.listing;
    let userID = req.body.id;
    if (listing && userID) {
        dashboardUsers[userID].listings.push(listing);
    }
    res.send(dashboardUsers[userID]);
})

app.post('/api/user', (req, res) => {
    id = id + 1;
    let user = {
        id: id,
        listings: []
    };
    dashboardUsers[id] = user;
    res.send(user);
});

app.delete('/api/listings', (req, res) => {
    if (req.body.id) {
        dashboardUsers[req.body.id].listings = [];
    }
    listings = [];
    getListings();
});

app.delete('/api/user-stats', (req, res) => {
    userStatistics = {
        user: 0,
        seller: 0
    };
    getUserStatistics();
})

app.listen(3141, () => console.log('Server listening on port 3141!'));