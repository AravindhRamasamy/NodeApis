const services = require('../service/services');

function createProduct(req, res, next) {
    try {
        if (req.user == "admin") {
            services.createProduct(req, res);
        } else {
            res.send("Not Authorised")
        }
    } catch (err) {
        console.error(`Error while Creating`, err.message);
        next(err);
    }
}

function updateProduct(req, res, next) {
    try {
        if (req.user == "admin") {
            services.updateProduct(req, res);
        } else {
            res.send("Not Authorised")
        }
    } catch (err) {
        console.error(`Error while Login`, err.message);
        next(err);
    }
}

function deleteProduct(req, res, next) {
    try {
        if (req.user == "admin") {
            services.deleteProduct(req, res);
        } else {
            res.send("Not Authorised")
        }
    } catch (err) {
        console.error(`Error while Login`, err.message);
        next(err);
    }
}

function getAll(req, res, next) {
    try {
        services.getAll(req, res);
    } catch (err) {
        console.error(`Error while Login`, err.message);
        next(err);
    }
}

function getOneByName(req, res, next) {
    try {
        services.getOneByName(req, res);
    } catch (err) {
        console.error(`Error while Login`, err.message);
        next(err);
    }
}
function orderProduct(req, res, next) {
    try {
        services.orderProduct(req, res);
    } catch (err) {
        console.error(`Error while Login`, err.message);
        next(err);
    }
}
function listOrder(req, res, next) {
    try {
        services.listOrder(req, res);
    } catch (err) {
        console.error(`Error while Login`, err.message);
        next(err);
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAll,
    getOneByName,
    listOrder,
    orderProduct
};