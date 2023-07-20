const { Color } = require("../models");
const { colorSchema } = require("../validations/colorSchema");

const addColor = async (req, res) => {
  try {
    const { ...data } = req.body;

    await colorSchema.validateAsync(data);
    const color = await Color.create(data);

    return res.status(201).send(color);
  } catch (error) {

    return res.status(500).json({
      message: error.message
    });
  }
}

const getAllColors = async (req, res) => {
  try {
    const colors = await Color.findAll();

    return res.status(200).send({data : colors});
  } catch (error) {
    return res.status(500).json({
      message: "Something is wrong"
    });
  }
}

const getColor = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await Color.findByPk(id);

    return res.status(200).send(color);
  } catch (error) {
    return res.status(500).json({
      message: "Something is wrong"
    });
  }
}

const updateColor = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    await colorSchema.validateAsync(data)
    await Color.update(
      data,
      {
        where: { id },
      })
    const updatedColor = await Color.findByPk(id);

    return res.status(200).send(updatedColor);
  } catch (error) {

    return res.status(500).json({
      message: error.message
    });
  }
}

const deleteColor = async (req, res) => {
  try {
    const { id } = req.params;
    await Color.destroy({
      where: { id }
    });

    return res.status(200).send("Deleted color by id:" + id);
  } catch (error) {

    return res.status(500).json({
      message: "Something is wrong"
    });
  }
}

module.exports = {
  addColor,
  getAllColors,
  getColor,
  updateColor,
  deleteColor
}