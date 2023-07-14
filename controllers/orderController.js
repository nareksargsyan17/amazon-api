const { Order, Product, Address } = require("../models")
const {orderSchema} = require("../validations/orderSchema");

const addOrder = async (req, res) => {
  try {
    const { ...data } = req.body;

    await orderSchema.validateAsync(data);
    const order = await Order.create({userId: req.user.id, ...data});

    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const getUserOrders = async (req, res) => {
  try {
    const order = await Order.findAll( {
      where: {
        userId: req.user.id
      },
      include: [
        {
          model: Product,
          as: 'product'
        },
        {
          model: Address,
          as: "address"
        }
      ]
    })

    return  res.status(200).send(order);
  } catch (error) {
    return res.send({
      message: "Something is wrong"
    })
  }
}

module.exports = {
  addOrder,
  getUserOrders
}