const {Category} = require("../models");
const {categorySchema} = require("../validations/categorySchema");

const addCategory = async (req, res) => {
  try {
    const {...data} = req.body;

    await categorySchema.validateAsync(data);
    const category = await Category.create(data);
    return res.status(200).send(category);

  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: e.message
    })
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (categories.length === 0) {
      console.log(typeof res.status(204))
      return res.status(404).send({
        message : "Categories not exists"
      })
    }
    return res.status(200).send(categories);

  } catch (error) {
    return res.status(500).send({
      message : "Something is wrong"
    })
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);
  res.status(200).send(category);
}

const updateCategory = async (req, res) => {
  const {id} = req.params;
  const {...data} = req.body;

  await Category.update(
    data,
    {
      where: {id: id},
    })
  const updatedCategory = await Category.findByPk(id);
  res.status(200).send(updatedCategory);
}

const deleteCategory = async (req, res) => {
  const {id} = req.params;

  await Category.destroy({
    where: {
      id: id
    }
  })
  res.send(200);
}

module.exports = {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory
}