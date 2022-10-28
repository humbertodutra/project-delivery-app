const userModel = require('../database/models/user.model');
const jwtService = require('../middlewares/jwtService');

const userService = {
  createUser: async (name, email, password) => {
    const data = await userModel.findOne({ where: { email } });
    if (data) {
      const error = new Error('User Already Registered');
      error.name = 'ConflitError';
      throw error;
    }
    await userModel.create({ name, email, password });
    const tokenParams = { name, email };
    const token = jwtService.createToken(tokenParams);
    return token;
  },
};

module.exports = userService;