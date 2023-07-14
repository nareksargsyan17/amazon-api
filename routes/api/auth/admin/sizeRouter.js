const router = require("express").Router();
const sizeController = require("../../../../controllers/sizeController");
const validateId = require("../../../../middleware/sizeMiddleware");




router.post("/add", sizeController.addSize);

router.use("/:id", validateId);

router.put("/update/:id", sizeController.updateSize);
router.delete("/delete/:id", sizeController.deleteSize);

module.exports = router;