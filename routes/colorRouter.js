const router = require("express").Router();
const colorController = require("../controllers/colorController");


router.post("/addColor", colorController.addColor);

module.exports = router;