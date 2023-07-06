const { Product, Category } = require('../models/index.js');

const addProduct = async (req, res) => {
    const {...data} = req.body;

    const product = await Product.create(data);

    res.status(200).send(product);
}

const getAllProducts = async (req, res) => {
    const products = await Product.findAll({
        include : [
            {model : Category}
        ]
    });
    res.status(200).send(products);
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
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
            {model : Category, required : true},
        ]
    })

    res.status(200).send(product);
}

module.exports = {
    addProduct,
    getAllProducts,
    updateProduct
}
