// require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign(data, 'minhaSenhaSeguraJWT');
    return token;
  },
};

module.exports = jwtService;