const md5 = require('md5');
const { Op } = require('sequelize');
const { users } = require('../database/models');
const jwtService = require('../middlewares/jwtService');

const userService = {
  createUser: async ({ name, email, password }) => {
    const data = await users.findOne({ where: { [Op.or]: [{ email }, { name }] } });
    if (data) {
      const error = new Error('User Already Registered');
      error.name = 'ConflitError';
      throw error;
    }
    const crypt = md5(password);
    const createUser = await users.create({ name, email, password: crypt, role: 'customer' });
    return createUser;
  },

  makeLogin: async ({ email, password }) => {
    const user = await users.findOne({ where: { email } });
    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'NotExist';
      throw error;
    }
    const verifyPassword = md5(password) === user.password;
    if (!verifyPassword) {
      const error = new Error('Incorrect email or password');
      error.name = 'NotExist';
      throw error;
    }

    const token = jwtService.createToken(email);
    return token;
  },

  listOneUserService: async (email) => {
    const result = await users.findOne({
      where: { email },
      attributes: { exclude: ['password', 'id'] },
    });

    return result;
  },
};

module.exports = userService;