const { Router } = require('express');
const productsController = require('../controller/ProductsController');

const productRoute = Router();

productRoute.get('/', productsController.listProductsController);
productRoute.get('/:id', productsController.listOneProductController);

module.exports = productRoute;