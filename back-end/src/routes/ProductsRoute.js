const { Router } = require('express');
const productsController = require('../controller/ProductsController');
const auth = require('../middlewares/authMiddleware');

const productRoute = Router();

productRoute.get('/', auth, productsController.listProductsController);
productRoute.get('/:id', auth, productsController.listOneProductController);

module.exports = productRoute;