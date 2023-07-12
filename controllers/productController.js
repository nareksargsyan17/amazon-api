const { Product, Category, Image } = require('../models');
const { Op } = require("sequelize");
const { productSchema } = require("../validations/productSchema");
const pagination = require("../pagination/pagination");

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

const uploadImages = async (req, res) => {
  try {
    const { id } = req.params;
    const imagesArr = req.files["gallery"].map(el => {
      return {
        productId: id,
        path : el.path,
      };
    });
    imagesArr.push({
      productId: id,
      path : req.files["main"][0].path,
      isMain: true
    });
    const images = await Image.bulkCreate(imagesArr);

    return res.status(200).send(images);
  } catch (error) {
    return res.json({
      message: "Something is wrong"
    })
  }
}

const getAllProducts = async (req, res) => {
  try {
    const { page, limit, sortDirection, sortWith, searchBy } = req.query;
    const products = await Product.findAll({
      ...pagination(page, limit, sortDirection, sortWith),
      include: [
        {
          model: Image,
          as: "images",
          where: {
            isMain: true
          }
        },
        { model: Category }
      ],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: searchBy ? searchBy : ""
            }
          },
          {
            brand: {
              [Op.substring]: searchBy ? searchBy : ""
            }
          }
        ]
      }
    });

    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({
      message: "Something is wrong"
    });
  }
}

const getAllPublishedProducts = async (req, res) => {
  try {
    const { page, limit, sortDirection, sortWith, searchBy } = req.query;
    const products = await Product.findAll({
      ...pagination(page, limit, sortDirection, sortWith),
      include: [
        {
          model: Image,
          as: "images",
          where: {
            isMain: true
          }
        },
        { model: Category }
      ],
      where: {
        [Op.and]: [
          {isPublished: true},
          {
            [Op.or]: [
              {
                name: {
                  [Op.substring]: searchBy ? searchBy : ""
                }
              },
              {
                brand: {
                  [Op.substring]: searchBy ? searchBy : ""
                }
              }
            ]
          }
        ]
      }
    });

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
          {
            model: Image,
            as: "images"
          },
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
      { where: { id }}
    )
    const product = await Product.findByPk(
      id, {
        includes: [
          {
            model: Image,
            as: "images"
          },
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
    const {id} = req.params;
    await Product.destroy({
      where: { id }
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

module.exports = {
  addProduct,
  getAllProducts,
  getAllPublishedProducts,
  updateProduct,
  getProductById,
  deleteProduct,
  uploadImages
}
