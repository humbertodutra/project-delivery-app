const { products } = require('../database/models');

const productService = {
  async listProductsService() {
    const results = products.findAll();

    return results;
  },
};

module.exports = productService;