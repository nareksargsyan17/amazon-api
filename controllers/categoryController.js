const { Category, Product } = require("../models");
const { categorySchema } = require("../validations/categorySchema");

const addCategory = async (req, res) => {
  try {
    const { ...data } = req.body;
    await categorySchema.validateAsync(data);
    const category = await Category.create(data);

    return res.status(200).send(category);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ where: { parentId: null }});

    return res.status(200).send(categories);
  } catch (error) {
    return res.status(500).send({
      message: "Something is wrong"
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { category } = req;
    const subCategories = await category.getSubCategories();

    return res.status(200).send({category, subCategories});
  } catch (error) {
    return res.status(500).send({
      message: "Something is wrong"
    });
  }
}

const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const products = [];
    const category = await Category.findByPk(id, { include: { model: Product, as: "products" }});
    products.push(...category.products);
    await subcategory(category);

    async function subcategory(category) {
      try {
        const subCategories = await Category.findAll({
          where: { parentId: category.id },
          include: { model: Product, as: "products" }
        });
        subCategories.forEach(child => {
          products.push(...child.products);
        })
        for (let i = 0; i < subCategories.length; i++) {
          if (subCategories[i].id) {
            await subcategory(subCategories[i]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({
      message: "Something is wrong"
    });
  }
}

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;

    await categorySchema.validateAsync(data);
    await Category.update(
      data,
      {
        where: { id },
      })
    const updatedCategory = await Category.findByPk(id);

    return res.status(200).send(updatedCategory);
  } catch (error) {

    return res.json({
      message: error.message
    });
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.destroy({ where: { id }})

    return res.send({
      message: "Deleted Size by id:" + id
    });
  } catch (error) {

    return res.status(500).send({
      message: "Something is wrong"
    });
  }
}

module.exports = {
  addCategory,
  getAllCategories,
  getCategory,
  getProductsByCategory,
  updateCategory,
  deleteCategory
}