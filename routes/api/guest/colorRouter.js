const router = require("express").Router();
const { getColor, getAllColors } = require("../../../controllers/colorController");
const validateId = require("../../../middleware/colorMiddleware");


router.get("/get_all", getAllColors);

router.use("/:id", validateId);

router.get("/get/:id", getColor);


module.exports = router;
