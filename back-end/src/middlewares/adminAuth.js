require('dotenv/config');

const jwt = require('jsonwebtoken');
const jwtKey = require('fs')
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

const userService = require('../services/UserService');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const error = new Error('Token not found');
    error.name = 'NotFoundToken';
    throw error;
  }

  try {
    const decoded = jwt.verify(authorization, jwtKey);
    
    const { role } = await userService.listOneUserService(decoded);
    if (role !== 'administrator') return res.status(401).json({ message: 'Invalid role' });

    req.userData = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};