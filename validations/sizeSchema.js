const Joi = require('joi');
const { Size } = require('../models');

async function existsSize(size) {
  const sizeField = await Size.findOne({
    where: {
      size : size,
    }
  });

  if (sizeField) {
    throw new Error('Size already exists');
  }

  return size;
}

const sizeSchema = Joi.object({
  size: Joi.string()
    .alphanum()
    .required()
    .external(existsSize)
    .messages({
      "any.required" : "Size is required"
    })
})

exports.sizeSchema = sizeSchema;