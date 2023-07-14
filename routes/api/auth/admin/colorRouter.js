const router = require("express").Router();
const colorController = require("../../../../controllers/colorController");
const validateId = require("../../../../middleware/colorMiddleware");



router.post("/add", colorController.addColor);

router.use("/:id", validateId);

router.put("/update/:id", colorController.updateColor);
router.delete("/delete/:id", colorController.deleteColor);

module.exports = router;
