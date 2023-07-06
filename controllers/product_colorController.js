const { Product_Color } = require("../models/index");

const addProductColor = async (data) => await Product_Color.bulkCreate(data);

module.exports = {
    addProductColor
}