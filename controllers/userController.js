const { userSchema } = require("../validations/userSchema");
const { User } = require("../models")
const bcrypt = require("bcrypt")

const registration = async (req, res) => {
  try {
    console.log(req.body)
    const { ...data } = req.body;
    await userSchema.validateAsync(data);

    data.password = await bcrypt.hash(data.password, 12);
    console.log(data.password)
    await User.create(data);
    return res.status(200).send({
      message: "You successfully registered"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something is wrong"
    })
  }
}


module.exports = {
  registration
}