const services = require('../service/services');

function createProduct(req, res, next) {
    try {
        services.createProduct(req,res);
    } catch (err) {
        console.error(`Error while Creating`, err.message);
        next(err);
    }
  }
  
  function updateProduct(req, res, next) {
    try {
      services.updateProduct(req,res);
    } catch (err) {
      console.error(`Error while Login`, err.message);
      next(err);
    }
  }

  function deleteProduct(req, res, next) {
    try {
      services.deleteProduct(req.body);
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
  
  module.exports = {
    createProduct,updateProduct,deleteProduct,getAll,getOneByName
  };