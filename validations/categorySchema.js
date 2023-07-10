const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .required()
    .messages({
      'any.required': "Name is required"
    }),
  parentId: Joi.number()
})

exports.categorySchema = categorySchema;