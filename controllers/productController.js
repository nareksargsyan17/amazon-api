const { Product, Category } = require('../models/index.js');

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
        where: { isPublished: true },
        include: [
            {model: Category}
        ]
    });
    res.status(200).send(products);
}

const getProductById = async (req, res) => {
    const { id } = req.params;

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

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    await Product.destroy({where: {id: id}});
    res.send(200)
}

module.exports = {
    addProduct,
    getAllProducts,
    getAllPublishedProducts,
    updateProduct,
    getProductById,
    deleteProduct
}
