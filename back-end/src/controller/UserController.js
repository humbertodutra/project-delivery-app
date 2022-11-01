const { validationBodyUser } = require('../middlewares/BodyVals');
const userService = require('../services/UserService');

const userController = {
  /** @type {import('express').RequestHandler} */
  createUser: async (req, res) => {
    await validationBodyUser(req.body);
    const data = await userService.createUser(req.body);
    res.status(201).json(data);
  },
  makeLogin: async (req, res) => {
    const login = await userService.makeLogin(req.body);
    return res.status(200).json({ token: login });
  },
};

module.exports = userController;