const { products } = require('../database/models');

const productService = {
  async listProductsService() {
    const results = await products.findAll();

    return results;
  },

  async listOneProductService(id) {
    const result = await products.findByPk(id);

    return result;
  },
};

module.exports = productService;