const MongoClient = require('mongodb').MongoClient;

const state = {
    db: null
};

export class DataAccess {

    static connect(url, done) {
        if (state.db) {
            return done();
        }
        MongoClient.connect(url, function(err, client) {
            if (err) {
                return done(err);
            }
            state.db = client.db(process.env.DATABASE_NAME);
            done();
        });
    }

    static get() {
        return state.db;
    }

    static close(done) {
        if (state.db) {
            state.db.close(function(err, result) {
                state.db = null;
                done(err);
            });
        }
    }

    static getCollectionData(collectionName, done) {
        state.db.collection(collectionName).find({}).toArray((err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            done(data);
        })
    }
}