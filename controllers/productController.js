const { Product, Category, Color, Size } = require('../models/index.js');
const productColorController = require("./product_colorController");
const productSizeController = require("./product_sizeController");

const addProduct = async (req, res) => {
    const {colors, sizes, ...data} = req.body;

    const product = await Product.create(data);
    const product_color_data = colors.map(color => {
        return {
            productId: product.id,
            colorId: color
        }
    });
    const product_size_data = sizes.map(size => {
        return {
            productId: product.id,
            sizeId: size
        }
    });

    await productColorController.addProductColor(product_color_data);
    await productSizeController.addProductSize(product_size_data);

    res.status(200).send(product);
}

const getAllProducts = async (req, res) => {
    const products = await Product.findAll({
        include : [
            {model : Category, required : true},
            {model : Color, required : true},
            {model: Size, required: true}
        ]
    });
    res.status(200).send(products);
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {colors, sizes, ...data} = req.body;
    if (data) {
        await Product.update(
            data,
            {
                where: {
                    id: id
                }
            })
    }

    if (colors) {
        const colorsArr = colors.map(color => {
            return {
                productId: id,
                colorId: color
            }
        })
        await productColorController.addProductColor(colorsArr);
    }

    if (sizes) {
        const sizesArr = sizes.map(size => {
            return {
                productId: id,
                sizeId: size
            }
        })
        await productSizeController.addProductSize(sizesArr);
    }

    const product = await Product.findByPk(
        id, {
        includes: [
            {model : Category, required : true},
            {model : Color, required : true},
            {model: Size, required: true}
        ]
    })

    res.status(200).send(product);
}

module.exports = {
    addProduct,
    getAllProducts,
    updateProduct
}