const router = require("express").Router();
const productController = require("../../../../controllers/productController.js");
const upload = require("../../../../config/imageConfig");
const validateId = require("../../../../middleware/productMiddleware");
const auth = require("../../../../middleware/authMiddleware");

router.use(auth);
router.post("/add", productController.addProduct);
router.get("/get_all", productController.getAllProducts);

router.use(":id", validateId);

router.post("/upload_images/:id", upload.fields([{ name: 'main', maxCount: 1 }, { name: 'gallery', maxCount: 5 }]), validateId, productController.uploadImages)
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;