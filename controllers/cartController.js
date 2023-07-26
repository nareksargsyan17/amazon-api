const { Cart, Product } = require("../models")
const {cartSchema} = require("../validations/cartSchema");
const {Op} = require("sequelize");

const addToCartBulk = async (req, res) => {
  try {
    const {products, savedProducts, userId} = req.body;
    const newProducts = products.map( product => ({ count: product.count, size: product.size, color: product.color, productId: product.id, userId, type: "cart"}));
    const newSavedProducts = savedProducts.map(product => ({ count: product.count, size: product.size, color: product.color, productId: product.id, userId, type: "saved"}));
    await cartSchema.validateAsync([...newProducts, ...newSavedProducts]);
    await Cart.bulkCreate([...newProducts, ...newSavedProducts])
    return res.status(200).send({
      successMessage: "Created"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: error.message
    })
  }
}

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const {id, ...product} = req.body;
    const data = {...product, userId, type: "cart", productId: id};
    const finded = await Cart.findOne({
      where: {
        [Op.and] : [
          {
            userId
          },
          {
            productId : data.productId
          },
          {
            color: product.color
          },
          {
            size: product.size
          }
        ]
      }
    })
    if (finded) {
      return res.status(400).send({
        message: "The product is already exist"
      })
    } else {
      await cartSchema.validateAsync([data]);
      await Cart.create(data);
      return res.status(200).send({
        successMessage: "Created"
      })
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const getCartsProducts = async (req, res) => {
  try {
    const userId = req.user.id;

    const allProducts = await Cart.findAll({
      where: {
        userId
      },
      include: [
        {model: Product, as: "products", attributes: ["name", "brand", "price", "category"]}
      ]
    })
  } catch (error) {

  }
}

module.exports = {
  addToCartBulk,
  addToCart
}