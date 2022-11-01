// require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign(data, 'minhaSenhaSeguraJWT');
    return token;
  },

  decodeToken: (token) => {
    const email = jwt.decode(token, 'minhaSenhaSeguraJWT');
    return email;
  },
};

module.exports = jwtService;