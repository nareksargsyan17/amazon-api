const router = require("express").Router();
const colorController = require("../../controllers/colorController");
const { Color } = require("../../models");

async function validateId(req, res, next) {
  const { id } = req.params;
  const color = await Color.findByPk(id);

  if (color) {
    req.color = color;
    next();
  } else {
    res.status(404).json({
      message: "id not found"
    })
  }
}

router.post("/addColor", colorController.addColor);
router.get("/getAllColors", colorController.getAllColors);
router.get("/getColor/:id", validateId, colorController.getColor);
router.put("/updateColor/:id", validateId, colorController.updateColor);
router.delete("/deleteColor/:id", validateId, colorController.deleteColor);

module.exports = router;
