const {Product, Category} = require('../models/index.js');
const {Op} = require("sequelize");

const addProduct = async (req, res) => {
  const {...data} = req.body;

  const product = await Product.create(data);

  res.status(200).send(product);
}

const getAllProducts = async (req, res) => {
  const products = await Product.findAll({
    include: [
      {model: Category}
    ]
  });
  res.status(200).send(products);
}

const getAllPublishedProducts = async (req, res) => {
  const products = await Product.findAll({
    where: {isPublished: true},
    include: [
      {model: Category}
    ]
  });
  res.status(200).send(products);
}

const getProductById = async (req, res) => {
  const {id} = req.params;

  const product = await Product.findByPk(
    id,
    {
      include: [
        {model: Category}
      ]
    })

  res.status(200).send(product);
}


const updateProduct = async (req, res) => {
  const {id} = req.params;
  const {...data} = req.body;

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
        {model: Category, required: true},
      ]
    })

  res.status(200).send(product);
}

const deleteProduct = async (req, res) => {
  const {id} = req.params;

  await Product.destroy({where: {id: id}});
  res.send(200)
}

const productFilter = async (req, res) => {
  const {categoryId} = req.query;

  const filteredProducts = await Product.findAll({
    where: {
      categoryId: {
        [Op.in]: categoryId.split(",")
      }
    },
    include: [
      {model: Category}
    ]
  })
  res.status(200).send(filteredProducts);
}

const productSearch = async (req, res) => {
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
  res.status(200).send(searchedProduct);
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
