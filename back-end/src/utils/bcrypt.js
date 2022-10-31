import * as bcrypt from 'bcryptjs';

function encryptPassword(password, hash) {
  const auth = bcrypt.compare(password, hash);
  return auth;
}

function createCrypt(password) {
  const crypt = bcrypt.hash(password);
  return crypt;
}

export { encryptPassword, createCrypt };
