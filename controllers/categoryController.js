const { Category } = require("../models");

const addCategory = async (req, res) => {
    const {...data} = req.body;

    const category = await Category.create(data);
    res.status(200).send(category);
};

const getAllCategories = async (req, res) => {
    const categories = await Category.findAll();
    res.status(200).send(categories);
};

const getCategory = async (req, res) => {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    res.status(200).send(category);
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { ...data } = req.body;

    await Category.update(
        data,
        {
            where : { id: id },
        })
    const updatedCategory = await Category.findByPk(id);
    res.status(200).send(updatedCategory);
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;

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