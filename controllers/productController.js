const { Product, Category, Image, Color, Size, User } = require('../models');
const { Op} = require("sequelize");
const { productSchema } = require("../validations/productSchema");
const { productUpdateSchema } = require("../validations/productUpdateSchema");
const pagination = require("../pagination/pagination");
const getSelectedCategories = require("../getSelectedCategories/getSelectedCategories");

const addProduct = async (req, res) => {
  try {
    const { ...data } = req.body;
    data.userId = req.user.id;
    await productSchema.validateAsync(data);
    const product = await Product.create(data);

    return res.status(200).send({
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

const uploadImages = async (req, res) => {
  try {
    const { id } = req.params;
    const {main, gallery} = req.files;

    let imagesArr = [];

    if (gallery?.length > 0)
      imagesArr = gallery.map(el => {
        return {
          productId: id,
          path : el.path,
        };
      });

    if (main?.length > 0) {
      imagesArr.push({
        productId: id,
        path : main[0].path,
        isMain: true
      });
    }



    await Image.bulkCreate(imagesArr);

    return res.status(200).send({
      successMessage: "uploaded"
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const removeImage = async (req, res) => {
  try {
    const { id } = req.params;
    await Image.destroy({ where: { id } });
    return res.status(200).send({
      successMessage: "Deleted"
    })
  } catch (error) {
    return res.status(500).send({
      successMessage: error.message
    })
  }
}

const getAllProducts = async (req, res) => {
  try {
    const userId = req.user.id
    const products = await Product.findAndCountAll({
      include: [
        {
          model: Image,
          as: "images",
          where: {
            isMain: true
          }
        },
        { model: Category, as: "category" },
      ],
      where: {
        userId
      }
    });

    return res.status(200).send({data: products});
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Something is wrong"
    });
  }
}

const getAllPublishedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, limit, sortDirection, sortWith, searchBy, color, size } = req.query;
    const products = await Product.findAndCountAll({
      ...pagination(page, limit, sortDirection, sortWith),
      include: [
        {
          model: Image,
          as: "images",
          where: {
            isMain: true
          }
        },
        { model: Category, as: "category" }
      ],
      where: {
        [Op.and]: [
          {categoryId: {
              [Op.in]: await getSelectedCategories(id)
            }
          },
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
    if (color && JSON.parse(color).length > 0) {
      const colors = JSON.parse(color);
      products.rows = products.rows.filter(elem => {
        const elemColor = JSON.parse(elem.colors);
        for (let i = 0; i < colors.length; i++) {
          if (elemColor.find( color => color === colors[i] )){
            return true
          }
        }
      })
      products.count = products.rows.length
    }

    if (size && JSON.parse(size).length > 0) {
      const sizes = JSON.parse(size)
      products.rows = products.rows.filter(elem => {
        const elemSize = JSON.parse(elem.sizes);
        for (let i = 0; i < sizes.length; i++) {
          if (elemSize.find( size => size === sizes[i] )){
            return true
          }
        }
      })
      products.count = products.rows.length
    }


    return res.status(200).send({data: products});
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Something is wrong"
    });
  }
}

const getCartProducts = async (req, res) => {
  try {
    const { products, savedProducts } = req.body;
    const idProducts = products.map(product => product.id);
    const idSavedProducts = savedProducts.map(product => product.id);
    const fetchedProducts = await Product.findAll({
      where: {
        id: {
          [Op.in] : [...idProducts, ...idSavedProducts]
          }
        },
      include: [
        {model: Category, as: "category"},
        {model: Image, as: "images"}
      ]
      })
    const newProducts = [];
    const newSavedProducts = [];
    fetchedProducts.forEach(product => {
      const currProduct = products.find(elem => elem.id === product.id);
      const currSavedProduct = savedProducts.find(elem => elem.id === product.id);
      if (currProduct && !currSavedProduct) {
        newProducts.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          category: product.category.name,
          image: product.images.find(image => image.isMain === true).path,
          size: currProduct.size,
          color: currProduct.color,
          count: currProduct.count
        })
      } else {
        newSavedProducts.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          category: product.category.name,
          image: product.images.find(image => image.isMain === true).path,
          size: currSavedProduct.size,
          color: currSavedProduct.color,
          count: currSavedProduct.count
        })
      }

    })
    return res.status(200).send({data : {
      products: newProducts,
      savedProducts: newSavedProducts
    }})
  } catch (error) {
      return res.status(500).send({
        message: error.message
      })
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
          { model: Category, as : "category" },
          { model: User, as: "owner", attributes: ["id", "firstName", "lastName"] }
        ]
      })

    const colors = await Color.findAll({
      where: {
        id: {
          [Op.in] : JSON.parse(product.colors)
        }
      }
    })
    const sizes = await Size.findAll({
      where: {
        id: {
          [Op.in] : JSON.parse(product.sizes)
        }
      }
    })
    product.colors = colors;
    product.sizes = sizes;
    return res.status(200).send({data : product});
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Something is wrong"
    });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    await productUpdateSchema.validateAsync(data);
    await Product.update(
      data,
      { where: { id }}
    )
    console.log(data)
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
    console.log(product)
    return res.status(200).send({
      successMessage: "updated"
    });
  } catch (error) {
    return res.status(500).send({
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

    return res.status(200).send({
      successMessage: "Deleted Product by id: " + id
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({
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
  uploadImages,
  getCartProducts,
  removeImage
}
