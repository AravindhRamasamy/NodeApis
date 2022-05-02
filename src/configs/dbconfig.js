const MongoClient = require('mongodb').MongoClient;
const config = require('../utils/config.json');
const { logger } = require('../utils/logger');
const HOST = config.DB_HOST
const PORT = config.DB_PORT
const NAME = config.DB_NAME

const url = "mongodb://" + HOST + ":" + PORT + "/" + NAME

let db;

const createConnection = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, database) => {
            if (err) reject(err);
            else {
                db = database.db(NAME)
                resolve(db)
            }
        });
    })
}


const getDb = () => {
    logger.info(db)
    return db
}

module.exports = {
    createConnection,
    getDb
}
