const Joi = require("joi");
const { User } = require("../models");

async function existsUser(email) {
  const emailFieald = await User.findOne({
    where: { email }
  });

  if (emailFieald) {
    throw new Error('Email already exists');
  }

  return email;
}

const userSchema = Joi.object({
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required(),
  email: Joi.string()
    .min(3)
    .external(existsUser)
    .required()
    .email(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  re_password: Joi.any()
    .equal(Joi.ref('password'))
    .required(),
  role: Joi.boolean()
})

exports.userSchema = userSchema;