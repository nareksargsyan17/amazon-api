const { userSchema } = require("../validations/userSchema");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sendingMail } = require("../verification/userVerification");
const { changePassSchema } = require("../validations/changePassSchema");

const registration = async (req, res) => {
  try {
    const { ...data } = req.body;
    await userSchema.validateAsync(data);
    let user = await User.findOne({ where: { email: data.email } })
    if (!user) {
      data.password = await bcrypt.hash(data.password, 10);
      user = await User.create({
        ...data,
        token: crypto.randomBytes(16).toString("hex")
      });
    }
    const {firstName, lastName, email, token} = user;


    if (user) {
      await sendingMail({
        from: process.env.EMAIL,
        to: `${email}`,
        subject: "Account Verification Link",
        text: `
        Hello, ${firstName}  ${lastName} Please verify your email by clicking this link :
        ${process.env.VERIFY_LINK}/${user.id}/${token} `,
      });
    }

    return res.status(200).send({
      message: "Please verify your email"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message
    })
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { id, token } = req.params;

    const usertoken = await User.findOne({
      token,
      where: { id },
    });


    if (!usertoken) {
      return res.status(400).send({
        message: "Your verification link may have expired. Please click on resend for verify your Email.",
      });

    } else {
      const user = await User.findByPk(id);
      if (!user) {

        return res.status(401).send({
          msg: "We were unable to find a user for this verification. Please SignUp!",
        });

      } else if (user.verified) {
        return res
          .status(200)
          .send("User has been already verified. Please Login");

      } else {
        const updated = await User.update(
          {
            verified: true,
            token: null
          },
          {
            where: {
              id: usertoken.id,
            },
          }
        );

        if (!updated) {
          return res.status(500).send({msg: "Your account not verified"});
        } else {
          return res
            .status(200)
            .send("Your account has been successfully verified");
        }
      }
    }
  } catch (error) {
    return res.json({
      message: "Something is wrong!"
    })
  }
}

const login = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email }, exclude: ["password"]});

    let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 24 * 60 * 60 * 1000,
    });

    return res.status(201).send({
      data: user,
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something is wrong!"
    })
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { ...data } = req.body;
    await changePassSchema.validateAsync(data);

    const password = await bcrypt.hash(data.newPassword, 10);
    await User.update(
      { password },
      {
        where: { id }
      }
    );

    return res.status(200).send({
      message: "Your password was changed"
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const getProducts = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)
    const products = await user.getProducts({joinTableAttributes: []})

    return res.status(200).send(products);
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something is wrong"
    })
  }
}

module.exports = {
  registration,
  verifyEmail,
  login,
  changePassword,
  getProducts
}