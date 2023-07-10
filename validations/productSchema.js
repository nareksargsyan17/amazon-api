const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .required(),
  description: Joi.string(),
  brand: Joi.string(),
  price: Joi.number()
    .integer(),
  isPublished: Joi.boolean(),
  categoryId: Joi.number()
    .integer(),
  colors: Joi.string(),
  sizes: Joi.string()
})
exports.productSchema = productSchema;

