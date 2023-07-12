const { Color } = require("../models");

module.exports = async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    const color = await Color.findByPk(id);
    if (color) {
      req.color = color;
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