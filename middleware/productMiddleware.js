const { Product } = require("../models");

module.exports = async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (product) {
      req.product = product;
      next();
    } else {
      res.status(404).json({
        message: "id not found"
      })
    }
  } catch (error) {
    return res.json({
      message: "Something is wrong"
    })
  }
}