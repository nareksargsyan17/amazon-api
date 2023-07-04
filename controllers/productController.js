const { Product } = require('../models')
const categoryModel = require("../models1/categoryModel");
const addProduct = async (req, res) => {
    const data = {
        name : req.body.name,
        price : req.body.price
    }

    const product = await Product.create(data);
    res.status(200).send(product);
    console.log(product);
}

const getAllProducts = async (req, res) => {
    const products = await Product.findAll({
        include : []
    });
    res.status(200).send(products);
    console.log(products);
}

module.exports = {
    addProduct,
    getAllProducts
}