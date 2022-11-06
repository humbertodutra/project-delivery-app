const productService = require('../services/ProductService');
const userService = require('../services/UserService');

const validateUser = async (req, _res, next) => {
    const { userId, sellerId } = req.body;
    const verifyUser = await userService.listOneUserServiceById(userId);
    if (!verifyUser || verifyUser.length === 0) {
        next({ code: 404, message: 'Must have a valid User' });
    }

    if (!sellerId) {
      next({ code: 404, message: 'Must have a valid Seller' });
    }
 
    next();
};

const validateAddress = async (req, _res, next) => {
  const { deliveryAddress, deliveryNumber } = req.body;
  if (!deliveryAddress || typeof deliveryAddress !== 'string') {
    next({ code: 404, message: 'Must have a valid Address info' });
  }
  if (!deliveryNumber || typeof deliveryNumber !== 'string') {
    next({ code: 404, message: 'Must have a valid Address number' });
  }
  next();
};

const validateOrder = async (req, _res, next) => {
    const { orders } = req.body;
    if (!orders) {
      next({ code: 404, message: 'Must have a array of products' });
    }
    const productsArray = await Promise
      .all(orders.map(({ productId }) => productService.listOneProductService(productId)));
    if (!productsArray.every((item) => item !== null)) {
      next({ code: 404, message: 'Must have a array of valid products' });
    }
    if (!orders.every(({ quantity }) => typeof quantity === 'number')) {
      next({ code: 404, message: 'Must have a array with valid quantity' });
    }
    next();
  };

  module.exports = {
    validateUser,
    validateAddress,
    validateOrder,
  };