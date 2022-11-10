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
    await users.create({ name, email, password: crypt, role: 'customer' });
    return { name, email, password };
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
      attributes: { exclude: ['password'] },
    });

    return result;
  },

  listOneUserServiceById: async (id) => {
    const result = await users.findOne({
      where: { id },
      attributes: { exclude: ['password', 'email'] },
    });

    return result;
  },

  getByRole: async (role) => {
    const usersByRole = await users.findAll({ where: { role } });
    return usersByRole;
  },

  listAllUsers: async () => {
    const result = await users.findAll({
      attributes: { exclude: ['password'] },
    });
    return result;
  },

  adminRegister: async ({ name, email, password, role }) => {
    const data = await users.findOne({ where: { [Op.or]: [{ email }, { name }] } });

    if (data) {
      const error = new Error('User Already Registered');
      error.name = 'ConflitError';
      throw error;
    }
    
    const crypt = md5(password);
    await users.create({ name, email, password: crypt, role });
    return { name, email, password, role };
  },

  deleteUser: async (id) => {
    const user = await users.findOne({ where: { id } });
    if (!user) {
      const error = new Error('User not found');
      error.name = 'NotExist';
      throw error;
    }

    const result = await users.destroy({ where: { id } });
    if (result) {
      return { message: 'User deleted' };
    }
  },
};

module.exports = userService;