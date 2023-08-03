const { Cart, Product, Category, Image } = require("../models")
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
    console.log(product, id)
    const data = {...product, userId, type: "cart"};
    const finded = await Cart.findOne({
      where: {
        [Op.and] : [
          {
            userId
          },
          {
            productId : product.productId
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
        {model: Product, as: "product", attributes: ["name", "brand", "price", "id"], include: [
            {
              model: Category,
              as: "category",
              attributes: ["name"]
            },
            {
              model: Image,
              as: "images",
              where: {
                isMain : true
              },
              attributes: ["path"]
            }
          ]}
      ]
    })
    const data = {
      products: [],
      savedProducts: []
    }
    allProducts.forEach(product => {
      if (product.type === "cart") {
        data.products.push({
          id: product.id,
          productId: product.product.id,
          name: product.product.name,
          color: product.color,
          size: product.size,
          count: product.count,
          brand: product.product.brand,
          price: product.product.price,
          category: product.product.category.name,
          image: product.product.images[0].path
        })
      } else {
        data.savedProducts.push({
          id: product.id,
          productId: product.product.id,
          name: product.product.name,
          color: product.color,
          size: product.size,
          count: product.count,
          brand: product.product.brand,
          price: product.product.price,
          category: product.product.category.name,
          image: product.product.images[0].path
        })
      }
    })
    return res.status(200).send({data})
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    await Cart.update(data, {
      where: {
        id
      }
    })
    const updated = await Cart.findByPk(id);
    return res.status(200).send({
      data : updated
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const deleteCart = async (req, res) => {
  try {
    const  id = req.body;
    console.log(id)
    await Cart.destroy({
      where: {
        id : {
          [Op.in] : id
        }
      }
    })

    return res.status(200).send({
      data : id
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

module.exports = {
  addToCartBulk,
  addToCart,
  getCartsProducts,
  updateCart,
  deleteCart
}