const Joi = require('joi');

const validateUser = {
  validationBodyUser: (data) => {
    const schema = Joi.object({
      name: Joi.string().min(12),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    });
    const { error, value } = schema.validate(data);
    if (error) throw error;
    return value;
  },
};

module.exports = validateUser;