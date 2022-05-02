const jwt = require("jsonwebtoken");

const config = require('../utils/config.json');

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const createToken = payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.JWT_SECRET, (err, token) => {
      if (err) reject(err)
      else resolve(token)
    })
  })
}

module.exports = { verifyToken, createToken };