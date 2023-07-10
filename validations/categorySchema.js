const Joi = require('joi');
const { Category } = require('../models');

async function existsCategory(name) {
  const category = await Category.findOne({
    where: {
      name: name,
    }
  });

  if (category) {
    throw new Error('Category already exists');
  }

  return name;
}

const categorySchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .required()
    .external(existsCategory)
    .messages({
      'any.required': "Name is required"
    }),
})

exports.categorySchema = categorySchema;