const router = require("express").Router();
const colorController = require("../../../controllers/colorController");
const validateId = require("../../../middleware/colorMiddleware");


router.get("/get_all", colorController.getAllColors);

router.use("/:id", validateId);

router.get("/get/:id", colorController.getColor);


module.exports = router;
