const productController = require("../controllers/productController.js");
const router = require("express").Router()

router.post("/addProduct", productController.addProduct);
router.get("/getAllProducts", productController.getAllProducts);


module.exports = router;