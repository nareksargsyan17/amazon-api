const { Address, User } = require("../models");

module.exports = async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const address = await Address.findByPk(id);
    if (userId === address.userId) {
      const user = await User.findByPk(userId);
      if (address) {
        if (user) {

        }
        req.address = address;
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