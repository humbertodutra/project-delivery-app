const { Router } = require('express');

const auth = require('../middlewares/authMiddleware');
const adminAuth = require('../middlewares/adminAuth');
const userController = require('../controller/UserController');

const userRoute = Router();

userRoute.get('/user/all', auth, userController.listAllUsers);
userRoute.post('/register', userController.createUser);
userRoute.post('/admin/register', adminAuth, userController.adminRegister);
userRoute.post('/login', userController.makeLogin);
userRoute.get('/user', userController.listOneUserController);
userRoute.get('/user/role/:role', userController.getByRole);

module.exports = userRoute;