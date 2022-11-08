const express = require('express');
const { getAll, getById, create, updateStatus } = require('../controller/SaleController');
const auth = require('../middlewares/authMiddleware');
const { validateUser,
    validateAddress,
    validateOrder } = require('../middlewares/salesValidate');

const salesRoute = express.Router();

salesRoute.get('/customer/orders', auth, getAll);
salesRoute.get('/customer/orders/:id', auth, getById);
salesRoute.patch('/customer/orders/:id', auth, updateStatus);

salesRoute.post(
    '/customer/orders',
    auth,
    validateUser,
    validateAddress,
    validateOrder,
    create,
);

module.exports = salesRoute;