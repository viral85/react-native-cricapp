const Joi = require("@hapi/joi");

const name = Joi.string()
  .max(100)
  .trim()
  .required()
  .label("Name");

const username = Joi.string()
  .min(3)
  .max(10)
  .trim()
  .lowercase()
  .required()
  .label("Username");

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .trim()
  .lowercase()
  .required()
  .label("Email");

const password = Joi.string()
  .min(4)
  .max(50)
  .trim()
  .required()
  .label("Password");

const signUp = Joi.object().keys({
  name,
  username,
  email,
  password
});

const signIn = Joi.object().keys({
  username,
  password
});

module.exports = { signUp, signIn };
