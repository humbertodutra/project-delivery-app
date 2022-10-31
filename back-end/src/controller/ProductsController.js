const productService = require('../services/ProductService');

const productController = {
  /** @type {import('express').RequestHandler} */
  async listProductsController(_req, res) {
    const result = await productService.listProductsService();

    res.status(200).json(result);
  },
  /** @type {import('express').RequestHandler} */
  async listOneProductController(req, res) {
    const result = await productService.listOneProductService(req.params.id);

    res.status(200).json(result);
  },
};

module.exports = productController;