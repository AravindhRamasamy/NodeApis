const express = require('express');

const route = express.Router();

const login = require('../controllers/Login');
const product = require('../controllers/Product');
// to check whether the user is loggedin
const isAuthenticated = require('../middleware/auth');
const upload = require('../middleware/upload')

// to register
route.post('/register', login.register);
// to login
route.post('/login', login.login);

route.post('/createProduct',upload.single('image'),product.createProduct);
route.get('/getOneByName',product.getOneByName);
route.get('/getAll',product.getAll);
route.put('/updateProduct',upload.single('image'),product.updateProduct);
route.delete('/deleteProduct',isAuthenticated.verifyToken,product.deleteProduct);

module.exports = route;