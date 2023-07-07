const { Color } = require("../models");

const addColor = async (req, res) => {
    const { ...data } = req.body;

    const color = await Color.create(data);
    res.status(201).send(color);
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