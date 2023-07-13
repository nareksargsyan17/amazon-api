const router = require("express").Router();
const productController = require("../../controllers/productController.js");
const upload = require("../../config/imageConfig")
const validateId = require("../../middleware/productMiddleware");
const auth = require("../../middleware/authMiddleware");


router.post("/add", auth, productController.addProduct);
router.get("/get_all", auth, productController.getAllProducts);
router.get("/get_all_published", productController.getAllPublishedProducts);
router.post("/upload_images/:id", auth, upload.fields([{ name: 'main', maxCount: 1 }, { name: 'gallery', maxCount: 5 }]), validateId, productController.uploadImages)

router.use(":id", validateId);

router.get("/get/:id", productController.getProductById);
router.put("/update/:id", auth, productController.updateProduct);
router.delete("/delete/:id", auth, productController.deleteProduct);

module.exports = router;