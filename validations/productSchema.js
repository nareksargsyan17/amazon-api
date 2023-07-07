const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .required(),
    description: Joi.string(),
    brand: Joi.string()
})

module.exports = productSchema;

