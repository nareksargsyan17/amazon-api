const router = require("express").Router();
const productController = require("../../controllers/productController.js");
const upload = require("../../config/imageConfig")
const validateId = require("../../middleware/productMiddleware");


router.post("/add",  productController.addProduct);
router.get("/get_all", productController.getAllProducts);
router.get("/get_all_published", productController.getAllPublishedProducts);

router.use("/:id", validateId);

router.get("/get/:id", productController.getProductById);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.post("/upload_images/:id", upload.fields([{ name: 'main', maxCount: 1 }, { name: 'gallery', maxCount: 5 }]), productController.uploadImages)

module.exports = router;