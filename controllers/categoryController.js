const { Category } = require("../models");
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
    const categories = await Category.findAll();
    if (categories.length === 0) {
      return res.status(404).send({
        message : "There are no categories"
      });
    }

    return res.status(200).send(categories);
  } catch (error) {
    return res.status(500).send({
      message : "Something is wrong"
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    return res.status(200).send(category);
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
        where: { id: id },
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

    await Category.destroy({
      where: {
        id: id
      }
    })

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
  updateCategory,
  deleteCategory
}