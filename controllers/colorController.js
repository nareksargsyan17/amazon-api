const { Color } = require("../models/index");

const addColor = async (req, res) => {
    const { ...data } = req.body;

    const color = await Color.create(data);
    res.status(201).send(color);
}

module.exports = {
    addColor
}