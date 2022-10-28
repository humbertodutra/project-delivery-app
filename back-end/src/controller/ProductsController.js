const productService = require('../services/ProductService');

const productController = {
  /** @type {import('express').RequestHandler} */
  async listProductsController(_req, res) {
    const result = await productService.listProductsService();

    res.status(200).json(result);
  },
};

module.exports = productController;