const typeErrors = require('./ErrorObjects');

const filterErrors = (err, _req, res, _next) => {
  console.log(err, 'errorPesado');
  const { name, message } = err;
  if (typeErrors[name]) {
    res.status(typeErrors[name]).json({ message });
  } else {
    console.warn(err); res.sendStatus(500);
  }
};

module.exports = filterErrors;