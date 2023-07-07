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
        })
    }
}

const getAllColors = async (req, res) => {
    const colors = await Color.findAll();
    res.status(200).send(colors);
}

const getColor = async (req, res) => {
    const { id } = req.params;

    const color = await Color.findByPk(id);
    res.status(200).send(color);
}

const updateColor = async (req, res) => {
    const { id } = req.params;
    const { ...data } = req.body;

    await Color.update(
        data,
        {
            where : { id: id },
        })
    const updatedColor = await Color.findByPk(id);
    res.status(200).send(updatedColor);
}

const deleteColor = async (req, res) => {
    const { id } = req.params;

    await Color.destroy({
        where: { id: id }
    });
    res.status(200).send("Deleted color by id:" + id);
}

module.exports = {
    addColor,
    getAllColors,
    getColor,
    updateColor,
    deleteColor
}