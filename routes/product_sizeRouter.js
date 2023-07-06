const router = require("express").Router();
const productSizeController = require("../controllers/product_sizeController");


router.post("/addProductSize", productSizeController.addProductSize());

module.exports = router;