const productController = require("../controllers/productController.js");
const router = require("express").Router();

router.post("/addProduct", productController.addProduct);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getAllPublishedProducts", productController.getAllPublishedProducts);
router.get("/getProductById/:id", productController.getProductById);
router.put("/updateProduct/:id", productController.updateProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;