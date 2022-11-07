// require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtKey = require("fs")
  .readFileSync("./jwt.evaluation.key", { encoding: "utf-8" });

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign(data, jwtKey);
    return token;
  },

  decodeToken: (token) => {
    const email = jwt.decode(token, jwtKey);
    return email;
  },
};

module.exports = jwtService;