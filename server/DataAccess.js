const MongoClient = require('mongodb').MongoClient;

export class DataAccess {

    static state = {
        db: null
    };

    static connect(url, done) {
        if (this.state.db) {
            return done();
        }
        MongoClient.connect(url, function(err, db) {
            if (err) {
                return done(err);
            }
            this.state.db = db;
            done();
        }.bind(this));
    }

    static get() {
        return this.state.db;
    }

    static close(done) {
        if (this.state.db) {
            this.state.db.close(function(err, result) {
                this.state.db = null;
                done(err);
            });
        }
    }

    static getCollectionData(collection, done) {
        this.state.db.collection(collection).find({}).toArray((err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            done(data);
        })
    }
}