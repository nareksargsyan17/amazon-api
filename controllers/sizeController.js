const { Size } = require("../models/index");

const addSize = async (req, res) => {
    const {...data} = req.body;

    const size = await Size.create(data);
    res.status(201).send(size);
}

const getAllSizes = async (req, res) => {
    const sizes = await Size.findAll();
    res.status(200).send(sizes);
}

const getSize = async (req, res) => {
    const { id } = req.params;

    const size = await Size.findByPk(id);
    res.status(200).send(size);
}

const updateSize = async (req, res) => {
    const { id } = req.params;
    const { ...data } = req.body;

    await Size.update(
        data,
        {
            where: { id: id }
        })
    const updatedSize = await Size.findByPk(id);
    res.status(200).send(updatedSize);
}

const deleteSize = async (req, res) => {
    const { id } = req.params;

    await Size.destroy({
        where: { id: id }
    })

    res.status(200).send("Deleted Size by id:" + id);
}

module.exports = {
    addSize,
    getAllSizes,
    getSize,
    updateSize,
    deleteSize
}
