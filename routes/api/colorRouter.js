const router = require("express").Router();
const colorController = require("../../controllers/colorController");
const validateId = require("../../middleware/colorMiddleware");



router.post("/add", colorController.addColor);
router.get("/get_all", colorController.getAllColors);

router.use("/:id", validateId);
router.get("/get/:id", colorController.getColor);
router.put("/update/:id", colorController.updateColor);
router.delete("/delete/:id", colorController.deleteColor);

module.exports = router;
