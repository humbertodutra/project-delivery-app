const express = require('express');
const { getAll, getById, create, updateStatus } = require('../controller/SaleController');
const auth = require('../middlewares/authMiddleware');
const { validateUser,
    validateAddress,
    validateOrder } = require('../middlewares/salesValidate');

const saleRoute = express.Router();

saleRoute.get('/customer/orders', auth, getAll);
saleRoute.get('/customer/orders/:id', auth, getById);
saleRoute.patch('/customer/orders/:id', auth, updateStatus);

saleRoute.post(
    '/customer/orders',
    auth,
    validateUser,
    validateAddress,
    validateOrder,
    create,
);

module.exports = saleRoute;