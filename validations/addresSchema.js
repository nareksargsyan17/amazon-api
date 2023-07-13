const Joi = require("joi");

const addressSchema = Joi.object({
  address: Joi.string()
    .required(),
  isMain: Joi.boolean(),
  userId: Joi.number()
    .integer()
    .required()
});

exports.addressSchema = addressSchema;