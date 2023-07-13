const { Address, User } = require("../models");

module.exports = async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const category = await Address.findByPk(id);
    if (userId === category.userId) {
      const user = await User.findByPk(userId);
      if (category) {
        if (user) {

        }
        req.category = category;
        next();
      }
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