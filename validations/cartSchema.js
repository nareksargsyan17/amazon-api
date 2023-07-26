const Joi = require('joi');

const cartSchema = Joi.array().items(
  Joi.object({
    productId: Joi.number(),
    userId: Joi.number(),
    color: Joi.string(),
    size: Joi.string(),
    count: Joi.number(),
    type: Joi.string()
  })
)

exports.cartSchema = cartSchema;