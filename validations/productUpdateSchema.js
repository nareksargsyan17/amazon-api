const Joi = require('joi');

const productUpdateSchema = Joi.object({
  name: Joi.string()
    .alphanum(),
  description: Joi.string(),
  brand: Joi.string(),
  price: Joi.number()
    .integer(),
  isPublished: Joi.boolean(),
  categoryId: Joi.number()
    .integer(),
  userId: Joi.number()
    .integer(),
  colors: Joi.string(),
  sizes: Joi.string()
})

exports.productUpdateSchema = productUpdateSchema;

