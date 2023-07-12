const { Size } = require("../models");

module.exports = async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    const size = await Size.findByPk(id);
    if (size) {
      req.size = size;
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