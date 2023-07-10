const router = require("express").Router();
const productController = require("../../controllers/productController.js");
const { Product } = require("../../models");

async function validateId(req, res, next) {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (product) {
    req.product = product;
    next();
  } else {
    res.status(404).json({
      message: "id not found"
    })
  }
}

router.post("/addProduct", productController.addProduct);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getAllPublishedProducts", productController.getAllPublishedProducts);
router.get("/getProductById/:id", validateId, productController.getProductById);
router.put("/updateProduct/:id", validateId, productController.updateProduct);
router.delete("/deleteProduct/:id", validateId, productController.deleteProduct);
router.post("/filter", productController.productFilter);
router.get("/search", productController.productSearch);

module.exports = router;