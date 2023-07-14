const Joi = require("joi");
const { User } = require("../models");
const {Op} = require("sequelize");

async function existsUser(email) {
  const user = await User.findOne({
    where: {
      [Op.and]: [
        { email },
        { verified: true }
      ]
    }
  });

  if (user) {
    throw new Error('Email already exists');
  }

  return user;
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
  role: Joi.boolean(),
  verified: Joi.boolean(),
  token: Joi.string()
})

exports.userSchema = userSchema;