'use strict'

const _ = require('lodash')
const mongocon = require('../configs/dbconfig')
let logger = require('../utils/logger').logger

const queryTable = (table, query) => {
    return new Promise((resolve, reject) => mongocon.getDb().collection(table).find(query).toArray((err, cursor) => {
        if (err) {
            reject(err)
        } else {
            return resolve(cursor);
        }
    }))
}

const insertTable = (table, doc) => {
    const query = [doc]
    return new Promise((resolve, reject) => mongocon.getDb().collection(table).insertMany(query, (err, cursor) => {
        if (err) {
            logger.error(`Unable to query "${table}" table!` + err.message)
            reject(err)
        }
        else { return resolve(cursor) }
    }))
}

const insertOrder = (table, doc) => {
    const query = [doc]
    return new Promise((resolve, reject) => mongocon.getDb().collection(table).createIndex({ orderId: 1 }, { unique: true },(err,cursor)=>{
       return resolve(mongocon.getDb().collection(table).insertMany(query, (err, cursor) => {
            if (err) {
                logger.error(`Unable to query "${table}" table!` + err.message)
                reject(err)
            }
            else { return resolve(cursor) }
        }))
    }))
}

const updateTable = (table, primary, changes) => {
    var newch = { $set: changes }
    return new Promise((resolve, reject) => mongocon.getDb().collection(table).updateOne(primary, newch, function (err, cursor) {
        if (err) {
            reject(err)
            logger.error(`Unknown Error: Unable to update ${primary}`)
        }
        else { return resolve(cursor) }
    }))
}

const deleteTable = (table, remove) => {
    return new Promise((resolve, reject) => mongocon.getDb().collection(table).deleteOne(remove, function (err, cursor) {
        if (err) {
            reject(err)
            logger.error(`Unknown Error: Unable to remove ${primary}`)
        }
        else { return resolve(cursor) }
    }))
}

module.exports = {
    queryTable,
    insertTable,
    updateTable,
    deleteTable,
    insertOrder
}