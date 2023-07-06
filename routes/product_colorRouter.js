const router = require("express").Router();
const productColorController = require("../controllers/product_colorController");


router.post("/addProductColor", productColorController.addProductColor);

module.exports = router;