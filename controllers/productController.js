const { Product, Category } = require('../models');
const { Op } = require("sequelize");
const { productSchema } = require("../validations/productSchema")

const addProduct = async (req, res) => {
  try {
    const { ...data } = req.body;

    await productSchema.validateAsync(data);
    const product = await Product.create(data);

    return res.status(200).send(product);
  } catch (error) {

    return res.status(500).json({
      message: error.message
    });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category }
      ]
    });
    if (products.length === 0) {
      return res.json({
        message: "There are no products"
      })
    }

    return res.status(200).send(products);
  } catch (error) {

    return res.status(500).send({
      message: "Something is wrong"
    });
  }
}

const getAllPublishedProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { isPublished: true },
      include: [
        { model: Category }
      ]
    });
    if (products.length === 0) {
      return res.json({
        message: "There are no products"
      });
    }

    return res.status(200).send(products);
  } catch (error) {

    return res.status(500).send({
      message: "Something is wrong"
    });
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(
      id,
      {
        include: [
          { model: Category }
        ]
      })

    return res.status(200).send(product);
  } catch (error) {

    return res.status(500).send({
      message: "Something is wrong"
    });
  }
}


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    await productSchema.validateAsync(data);

    await Product.update(
      data,
      {
        where: {
          id: id
        }
      })


    const product = await Product.findByPk(
      id, {
        includes: [
          { model: Category },
        ]
      })

    return res.status(200).send(product);
  } catch (error) {
    return res.json({
      message: error.message
    });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.destroy({
      where: { id: id }
    });

    return res.send({
      message: "Deleted Size by id:" + id
    });
  } catch (error) {

    return res.json({
      message: "Something is wrong"
    })
  }
}

const productFilter = async (req, res) => {
  try {
    const { categories } = req.body;

    const filteredProducts = await Product.findAll({
      where: {
        categoryId: {
          [Op.in]: categories
        }
      },
      include: [
        { model: Category }
      ]
    })

    if (filteredProducts.length === 0) {
      return res.json({
        message: "There are not Products"
      });
    }

    return res.status(200).send(filteredProducts);
  } catch (error) {
    return res.json({
      message: "Something is wrong"
    });
  }
}

const productSearch = async (req, res) => {
  try {
    const {searchBy} = req.query;
    const searchedProduct = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: searchBy
            }
          },
          {
            brand: {
              [Op.substring]: searchBy
            }
          }
        ]
      }
    })
    if (searchedProduct.length === 0) {
      return res.json({
        message: "There are not Products"
      });
    }

    return res.status(200).send(searchedProduct);
  } catch (error) {
    return res.json({
      message: "Something is wrong"
    });
  }
}

module.exports = {
  addProduct,
  getAllProducts,
  getAllPublishedProducts,
  updateProduct,
  getProductById,
  deleteProduct,
  productFilter,
  productSearch
}
