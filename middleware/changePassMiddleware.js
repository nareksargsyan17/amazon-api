const { User } = require("../models");

const bcrypt = require("bcrypt");

const checkingPass = async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  const user = await User.findByPk(id);

  const isSame = await bcrypt.compare(password, user.password);

  if (!isSame) {
    return res.status(500)
      .json({
        message: "Invalid password"
      });
  } else {
    next();
  }
}

module.exports = checkingPass