const { Order, Product, Address, Cart } = require("../models")
const {orderSchema} = require("../validations/orderSchema");
const {Op} = require("sequelize");
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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
          as: 'product',
          attributes: ["name", "brand", "price"]
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

const session = async (req, res) => {
  try {
    const  {products, addresses } = req.body;

    const line_items = products.map(product => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.brand
          },
          unit_amount: product.price * 100
        },
        quantity: product.count,
      }
    })
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.user.id,
        cart: JSON.stringify(products.map((product) => ({productId: product.productId,color: product.color, size: product.size, count: product.count})))
      }
    })
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items,
      mode: 'payment',
      custom_fields: [{
        key: "address",
        label: {type: "custom", custom: "Select Address"},
        type: "dropdown",
        dropdown: {
          options: addresses.map(address => (
              {label: address.address, value: address.id}
          ))
        }
      }],
      success_url: `${process.env.CLIENT_LINK}/order/success`,
      cancel_url: `${process.env.CLIENT_LINK}/mycart`,
    });
    return res.status(200).send({data: {
      url: session.url
    }})
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}
let endpointSecret =  'whsec_f28c56360506248873d41350deb17740d776e76ec6c7611d97911ca8b7a09aa7';
const webhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let data;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      data = event.data.object;
      eventType = event.type;
    } else {
        data = req.body.data.object;
        eventType = req.body.type;
    }


  console.log(eventType)
    // Handle the event
    if (eventType ===  "checkout.session.completed") {
      await stripe.customers.retrieve(data.customer).then(
        async (customer) => {
          const orders = JSON.parse(customer.metadata.cart).map(product => ({
            ...product,
            addressId: parseInt(data.custom_fields[0].dropdown.value),
            userId: parseInt(customer.metadata.userId)
          }))
          console.log(orders)
          await Order.bulkCreate(orders).then(async () =>{
            await Cart.destroy({
              where: {
                [Op.and] : [
                  {
                    userId: customer.metadata.userId
                  },
                  {
                    type: "cart"
                  }
                ]
              }
            })
            for (let i = 0; i < orders.length; i++) {
              const product = await Product.findByPk(orders[i].productId);
              await Product.update({bought: (product.bought + orders[i].count), earnings: product.earnings + (orders[i].count * product.price)}, {where: {
                  id: orders[i].productId
                }})
            }

          })
        }).catch((err) => {
            console.log("err", err)
        })
    } else if  (eventType ===  "payment_intent.payment_failed") {
      console.log(data)
    }

    return res.status(200).send({
      received: true
    })
}

module.exports = {
  addOrder,
  getUserOrders,
  session,
  webhook
}