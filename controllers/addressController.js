const { Address } = require("../models");
const { addressSchema } = require("../validations/addresSchema");
const {Op} = require("sequelize");

const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user.id;
    await addressSchema.validateAsync({address, userId});
    const addressData = await Address.create({address, userId});

    return res.status(200).send({
      data: addressData
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const chooseMain = async (req, res) => {
  try {
    const { id } = req.params;
    await Address.update(
      { isMain: false },
      {
        where: {
          [Op.and]: [
            {
              isMain: true
            },
            {
              userId: req.user.id
            }
          ]
        }
      }
    );

    await Address.update(
      { isMain: true },
      {
        where: { id }
      }
    );

    return res.status(200).send({
      data: id
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something is wrong"
    })
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await Address.destroy({
      where: {id}
    })
    return res.status(200).send({
      successMessage: "Deleted"
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const getAllAddresses = async (req, res) => {
  try {
    const user = req.user;
    const addresses = await user.getAddresses();
    return res.status(200).send({
      data: addresses
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something is wrong"
    })
  }
}

module.exports = {
  addAddress,
  chooseMain,
  getAllAddresses,
  deleteAddress
}