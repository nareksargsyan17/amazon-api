const Joi = require("joi");


const changePassSchema = Joi.object({
  password: Joi.string()
    .required(),
  newPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  re_newPassword: Joi.any()
    .equal(Joi.ref('newPassword'))
    .required(),
})

exports.changePassSchema = changePassSchema