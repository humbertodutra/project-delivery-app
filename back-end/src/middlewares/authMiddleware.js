require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtKey = require("fs")
  .readFileSync("./jwt.evaluation.key", { encoding: "utf-8" });

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    const error = new Error('Token not found');
    error.name = 'NotFoundToken';
    throw error;
  }
  try {
    const decoded = jwt.verify(authorization, jwtKey);
    req.userData = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};