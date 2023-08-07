const router = require("express").Router();
const { addSize, updateSize, deleteSize } = require("../../../../controllers/sizeController");
const validateId = require("../../../../middleware/sizeMiddleware");

router.post("/add", addSize);

router.use("*/:id", validateId);

router.put("/update/:id", updateSize);
router.delete("/delete/:id", deleteSize);

module.exports = router;