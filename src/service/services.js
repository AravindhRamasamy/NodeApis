const config = require('../utils/config.json')
const bcrypt = require("bcryptjs");
const _ = require('lodash')
const fs = require('fs');
const path = require('path');
const auth = require("../middleware/auth");
const { queryTable, insertTable, updateTable, deleteTable, insertOrder } = require('../utils/DBQuerys');
const { logger } = require('../utils/logger');
const { resolve } = require('path');

const createUser = (req, res) => {
    const userData = _.assign({}, _.pick(req.body, 'username', 'email', 'password', 'phonenumber'))
    bcrypt.hash(userData.password, 10).then(password=>{
        userData.password = password
        queryTable('usersDetail', { username: userData.username }).then((result) => {
            if (result === undefined || result.length === 0) {
                Promise.resolve(insertTable('usersDetail', userData)).then(() => {
                    res.send('user created')
                }).catch(err => { logger.error(err) })
            } else {
                res.send('user already exists')
                logger.error('user already exists')
            }
        }).catch(err => { logger.error(err) })
    })
}

const login = async (req, res) => {
    const userData = _.assign({}, _.pick(req.body, 'username', 'password'))
    queryTable('usersDetail', { username: userData.username}).then((result) => {
        if (result === undefined || result.length === 0) {
            res.send("user doesn't exists")
        } else {
            bcrypt.compare(userData.password,result[0].password).then((err)=>{
                if(err){
                    auth.createToken(userData.username)
                    .then(token => ({
                        authorization: token
                    })).then((authtoken) => {
                        res.send(authtoken)
                    })
                }else{
                    res.send("Invalid password")
                }
            })
        }
    }).catch(err => { logger.error(err) })
}

const createProduct = (req, res) => {
    const products = {
        name: req.body.name,
        quantity: req.body.quantity,
        noofitems: req.body.noofitems,
        price:req.body.price,
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

const listOrder = async (req, res) => {
    result = await Promise.resolve(queryTable('orders', {}))
    var response=[]
    for(var order of result){
        var image=[]
        for(var product of order.products){
            var p=await Promise.resolve(queryTable('products', { name: product.name }))
          image.push(_.assign(product, {image:p[0].image}))
        }
        order.products=image
        response.push(order)
    }
    res.send(response)
}

const orderProduct = (req, res) => {
    const order = req.body;
    Promise.resolve(insertOrder('orders', order)).then((result) => {
        if (result != undefined) {
            for (var product of req.body.products) {
                Promise.resolve(queryTable('products', { name: product.name })).then((result) => {
                    if (result != undefined && result.length != 0) {
                        const item = result[0]
                        item.quantity = item.quantity - product.quantity
                        Promise.resolve(updateTable('products', { name: item.name }, item)).then(() => {
                            logger.info("Updated stock")
                        }).catch(err => { logger.error(err) })
                    }
                }).catch(err => { logger.error(err) })
            }
            res.send("Ordered");
        } else {
            res.send("orderId already exists")
        }
    }).catch(err => { logger.error(err) })
}



module.exports = {
    createUser,
    login,
    createProduct,
    updateProduct,
    deleteProduct,
    getOneByName,
    getAll,
    listOrder,
    orderProduct
}

