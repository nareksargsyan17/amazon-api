const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = async function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    console.log(id)
    const user = await User.findByPk(id);
    console.log(user)
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(404).json({
        message: "id not found"
      })
    }
  } catch (error) {
    console.log(error)
    return res.json({
      message: "Something is wrong"
    })
  }
}