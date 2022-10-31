const { Router } = require('express');
const userController = require('../controller/UserController');

const userRoute = Router();

userRoute.post('/register', userController.createUser);
userRoute.post('/login', userController.makeLogin);

module.exports = userRoute;