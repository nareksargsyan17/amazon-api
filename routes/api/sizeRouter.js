const router = require("express").Router();
const sizeController = require("../../controllers/sizeController");
const { Size } = require("../../models");

async function validateId(req, res, next) {
  const { id } = req.params;
  const size = await Size.findByPk(id);

  if (size) {
    req.size = size;
    next();
  } else {
    res.status(404).json({
      message: "id not found"
    })
  }
}

router.post("/addSize", sizeController.addSize);
router.get("/getAllSizes", sizeController.getAllSizes);
router.get("/getSize/:id", validateId, sizeController.getSize);
router.put("/updateSize/:id", validateId, sizeController.updateSize);
router.delete("/deleteSize/:id", validateId, sizeController.deleteSize);

module.exports = router;