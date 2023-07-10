const { Size } = require("../models/index");
const { sizeSchema } = require("../validations/sizeSchema");

const addSize = async (req, res) => {
    try {
        const { ...data } = req.body;
        await sizeSchema.validateAsync(data);
        const size = await Size.create(data);

        return res.status(201).send(size);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const getAllSizes = async (req, res) => {
    try {
        const sizes = await Size.findAll();
        if (sizes.length === 0) {
            return res.json({
                message: "There are not Sizes"
            });
        }

        return res.status(200).send(sizes);
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

        return res.status(200).send(size);
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
          {
              where: { id: id }
          })
        const updatedSize = await Size.findByPk(id);

        return res.status(200).send(updatedSize);
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
            where: { id: id }
        })

        return res.status(200).send("Deleted Size by id:" + id);
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
