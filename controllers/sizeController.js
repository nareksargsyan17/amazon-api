const { Size } = require("../models/index");
const { sizeSchema } = require("../validations/sizeSchema");

const addSize = async (req, res) => {
  try {
    const { ...data } = req.body;
    await sizeSchema.validateAsync(data);
    const size = await Size.create(data);

    return res.status(200).send({
      data: size
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

const getAllSizes = async (req, res) => {
  try {
    const sizes = await Size.findAll();

    return res.status(200).send({data : sizes});
  } catch (error) {
    return res.status(500).json({
      message: "Something is wrong"
    });
  }
}

const getSize = async (req, res) => {
  try {
    const { id } = req.params;
    const size = await Size.findByPk(id);

    return res.status(200).send({
      data: size
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something is wrong"
    });
  }
}

const updateSize = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    await sizeSchema.validateAsync(data);
    await Size.update(
      data,
      { where: { id }}
    )
    const updatedSize = await Size.findByPk(id);

    return res.status(200).send({
      data: updatedSize
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

const deleteSize = async (req, res) => {
  try {
    const { id } = req.params;
    await Size.destroy({
      where: { id }
    })

    return res.status(200).send({
      data: id
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something is wrong"
    });
  }
}

module.exports = {
  addSize,
  getAllSizes,
  getSize,
  updateSize,
  deleteSize
}
