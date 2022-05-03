const services = require('../service/services');

function register(req, res, next) {
  try {
    services.createUser(req, res);
  } catch (err) {
    console.error(`Error while Creating`, err.message);
    next(err);
  }
}

function login(req, res, next) {
  try {
    services.login(req, res);
  } catch (err) {
    console.error(`Error while Login`, err.message);
    next(err);
  }
}


module.exports = {
  register, login
};