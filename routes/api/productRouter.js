const router = require("express").Router();
const productController = require("../../controllers/productController.js");
const upload = require("../../imageConfig/imageConfig")
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


router.post("/addProduct",  productController.addProduct);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getAllPublishedProducts", productController.getAllPublishedProducts);
router.get("/getProductById/:id", validateId, productController.getProductById);
router.put("/updateProduct/:id", validateId, productController.updateProduct);
router.delete("/deleteProduct/:id", validateId, productController.deleteProduct);
router.post("/upload_images/:id", validateId, upload.fields([{ name: 'main', maxCount: 1 }, { name: 'gallery', maxCount: 5 }]), productController.uploadImages)

module.exports = router;