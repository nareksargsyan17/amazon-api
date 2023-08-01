const Joi = require('joi');

const productUpdateSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  brand: Joi.string(),
  price: Joi.number()
    .integer(),
  isPublished: Joi.boolean(),
  categoryId: Joi.number()
    .integer(),
  userId: Joi.number()
    .integer(),
  colors: Joi.array(),
  sizes: Joi.array()
})

exports.productUpdateSchema = productUpdateSchema;

