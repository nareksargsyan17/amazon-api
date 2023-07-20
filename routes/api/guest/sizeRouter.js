const router = require("express").Router();
const { getAllSizes, getSize } = require("../../../controllers/sizeController");
const validateId = require("../../../middleware/sizeMiddleware");

router.get("/get_all", getAllSizes);

router.use("/:id", validateId);

router.get("/get/:id", getSize);

module.exports = router;