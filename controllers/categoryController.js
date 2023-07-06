const { Category } = require("../models/index");

const addCategory = async (req, res) => {
    const data = {
        name : req.body.name
    }
    const category = await Category.create(data);
    res.status(200).send(category);
};

const getAllCategories = async (req, res) => {
    const category = await Category.findAll();
    res.status(200).send(category);
};

module.exports = {
    addCategory,
    getAllCategories
}