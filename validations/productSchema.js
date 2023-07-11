const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .required(),
  description: Joi.string()
    .required(),
  brand: Joi.string()
    .required(),
  price: Joi.number()
    .integer()
    .required(),
  isPublished: Joi.boolean(),
  categoryId: Joi.number()
    .integer()
    .required(),
  colors: Joi.string()
    .required(),
  sizes: Joi.string()
    .required()
})

exports.productSchema = productSchema;

