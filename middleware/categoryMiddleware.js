const { Category } = require("../models");

module.exports = async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    console.log(id)
    if (id === "all") {
      next();
    } else {
      console.log(id)
      const category = await Category.findByPk(id);
      if (category) {
        req.category = category;
        next();
      } else {
        res.status(404).json({
          message: "id not found"
        })
      }
    }
  } catch (error) {
    console.log(error)
    return res.json({
      message: "Something is wrong"
    })
  }
}