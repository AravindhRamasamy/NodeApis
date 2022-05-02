const config = require('../utils/config.json')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require('lodash')
const fs = require('fs');
const path = require('path');
const usermodel = require('../models/usermodel');
const auth = require("../middleware/auth");
const { queryTable, insertTable, updateTable, deleteTable } = require('../utils/DBQuerys');
const { logger } = require('../utils/logger');

const createUser = (req, res) => {
    const userData = _.assign({}, _.pick(req.body, 'username', 'email', 'password', 'phonenumber'))
    queryTable('usersDetail', { email: userData.email }).then((result) => {
        if (result === undefined || result.length === 0) {
            Promise.resolve(insertTable('usersDetail', userData)).then(() => {
                auth.createToken(userData.username)
                    .then(token => ({
                        authorization: token
                    })).then((authtoken) => {
                        res.send('user created')
                    })
            }).catch(err => { logger.error(err) })
        } else {
            res.send('user already exists')
            logger.error('user already exists')
        }
    }).catch(err => { logger.error(err) })
}

const login = (req, res) => {
    const userData = _.assign({}, _.pick(req.body, 'username', 'password'))
    queryTable('usersDetail', { email: userData.username, password: userData.password }).then((result) => {
        if (result === undefined || result.length === 0) {
            res.send("user doesn't exists")
        } else {
            auth.createToken(userData.username)
                .then(token => ({
                    authorization: token
                })).then((authtoken) => {
                    res.send(authtoken)
                })
        }
    }).catch(err => { logger.error(err) })
}

const createProduct = (req, res) => {
    const products = {
        name: req.body.name,
        quantity: req.body.quantity,
        noofitems: req.body.noofitems,
        type: req.body.type,
        description: req.body.description,
        image: {
            data: fs.readFileSync(path.join('D:/Portfolio/NodeApis/src/routes/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    queryTable('products', { name: products.name }).then((result) => {
        if (result === undefined || result.length === 0) {
            Promise.resolve(insertTable('products', products)).then(() => {
                res.send('product created')
            }).catch(err => { logger.error(err) })
        } else {
            res.send('product already exists')
            logger.error('product already exists')
        }
    })
}

const updateProduct = (req, res) => {
    const products = {
        name: req.body.name,
        quantity: req.body.quantity,
        noofitems: req.body.noofitems,
        type: req.body.type,
        description: req.body.description,
        image: {
            data: fs.readFileSync(path.join('D:/Portfolio/NodeApis/src/routes/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Promise.resolve(updateTable('products', { name: products.name }, products)).then(() => {
        res.send('product updated')
    }).catch(err => { logger.error(err) })
}

const getOneByName = (req, res) => {
    query = { name: req.query.name }
    Promise.resolve(queryTable('products', query)).then((result) => {
        res.send(result)
    }).catch(err => { logger.error(err) })
}

const deleteProduct = (req, res) => {
    query = { name: req.query.name }
    Promise.resolve(deleteTable('products', query)).then((result) => {
        res.send(result)
    }).catch(err => { logger.error(err) })
}

const getAll = (req, res) => {
    Promise.resolve(queryTable('products', {})).then((result) => {
        res.send(result)
    }).catch(err => { logger.error(err) })
}




module.exports = { createUser, login, createProduct, updateProduct, deleteProduct, getOneByName, getAll }

