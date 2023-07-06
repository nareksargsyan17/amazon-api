const { Product_Size } = require("../models/index");

const addProductSize = async (data) => await Product_Size.bulkCreate(data);

module.exports = {
    addProductSize
}