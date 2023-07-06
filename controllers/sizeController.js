const { Size } = require("../models/index");

const addSize = async (req, res) => {
    const {...data} = req.body;

    const size = await Size.create(data);
    res.status(201).send(size);
}

module.exports = {
    addSize
}