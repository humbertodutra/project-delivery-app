const { Router } = require('express');
const productsController = require('../controller/ProductsController');

const productRoute = Router();

productRoute.get('/', productsController.listProductsController);

module.exports = productRoute;