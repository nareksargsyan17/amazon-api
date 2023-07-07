const router = require("express").Router();
const colorController = require("../controllers/colorController");


router.post("/addColor", colorController.addColor);
router.get("/getAllColors", colorController.getAllColors);
router.get("/getColor/:id", colorController.getColor);
router.put("/updateColor/:id", colorController.updateColor);
router.delete("/deleteColor/:id", colorController.deleteColor);

module.exports = router;
