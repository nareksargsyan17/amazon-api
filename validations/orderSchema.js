const Joi = require("joi");
const { Product, Address } = require("../models");

async function existsAddressId(addressId) {
  const address = await Address.findByPk(addressId);
  console.log(address)
  if (!address) {
    console.log(address,"jsjajsajsajsa")
    throw new Error('Address is not exists');
  }

  return address;
}

async function existsProductId(productId) {
  const product = await Product.findByPk(productId);

  if (!product) {
    throw new Error('Product is not exists');
  }

  return product;
}


const orderSchema = Joi.object({
  userId: Joi.number()
    .integer(),
  addressId: Joi.number()
    .integer()
    .required()
    .external(existsAddressId),
  productId: Joi.number()
    .integer()
    .external(existsProductId)
    .required(),
  count: Joi.number()
    .integer()
})

exports.orderSchema = orderSchema;