const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'any.required': "Name is required"
    }),
  parentId: Joi.number()
    .allow(null)
})

exports.categorySchema = categorySchema;