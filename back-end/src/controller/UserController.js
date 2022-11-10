const { validationBodyUser, validationBodyUserAdmin } = require('../middlewares/BodyVals');
const userService = require('../services/UserService');
const { decodeToken } = require('../middlewares/jwtService');

const userController = {
  /** @type {import('express').RequestHandler} */
  createUser: async (req, res) => {
    const { name, email, password } = await validationBodyUser(req.body);
    const data = await userService.createUser({ name, email, password });
    res.status(201).json(data);
  },

  makeLogin: async (req, res) => {
    const login = await userService.makeLogin(req.body);
    return res.status(200).json({ token: login });
  },

  listOneUserController: async (req, res) => {
    const token = req.headers.authorization;
    const decoding = decodeToken(token);
    const result = await userService.listOneUserService(decoding);

    res.status(200).json(result);
  },

  getByRole: async (req, res, next) => {
    const { role } = req.params;
    const users = await userService.getByRole(role);
    if (!users || users.length === 0) {
      return next({ code: 404, message: 'Can\'t find users' });
    }
    return res.status(200).json(users);
  },

  listAllUsers: async (_req, res) => {
    const result = await userService.listAllUsers();
    res.status(200).json(result);
  },

  adminRegister: async (req, res) => {
    const { name, email, password, role } = await validationBodyUserAdmin(req.body);
    const data = await userService.adminRegister({ name, email, password, role });
    res.status(201).json(data);
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.status(202).json(result);
  }
};

module.exports = userController;