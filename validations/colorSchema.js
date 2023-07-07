const Joi = require('joi');
const { Color } = require('../models');

async function existsColor(color) {
  const colorField = await Color.findOne({
    where: {
      color : color,
    }
  });

  if (colorField) {
    throw new Error('Color already exists');
  }

  return color;
}

const colorSchema = Joi.object({
  color: Joi.string()
    .alphanum()
    .required()
    .external(existsColor)
    .messages({
      "any.required" : "Color is required"
    })
})

exports.colorSchema = colorSchema;