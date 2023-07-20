const router = require("express").Router();
const { addColor, updateColor, deleteColor } = require("../../../../controllers/colorController");
const validateId = require("../../../../middleware/colorMiddleware");

router.post("/add", addColor);

router.use("/:id", validateId);

router.put("/update/:id", updateColor);
router.delete("/delete/:id", deleteColor);

module.exports = router;
