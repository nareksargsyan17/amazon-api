const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string()
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
  userId: Joi.number()
    .integer(),
  colors: Joi.array()
    .required(),
  sizes: Joi.array()
    .required()
})

exports.productSchema = productSchema;

