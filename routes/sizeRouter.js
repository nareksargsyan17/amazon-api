const router = require("express").Router();
const sizeController = require("../controllers/sizeController");


router.post("/addSize", sizeController.addSize);

module.exports = router;