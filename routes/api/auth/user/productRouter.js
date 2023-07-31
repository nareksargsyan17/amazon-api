const router = require("express").Router();
const { addProduct, getAllProducts, updateProduct, uploadImages, deleteProduct } = require("../../../../controllers/productController");
const upload = require("../../../../config/imageConfig");
const validateId = require("../../../../middleware/productMiddleware");


router.post("/add", addProduct);
router.get("/get_all", getAllProducts);

router.use("*/:id", validateId);

router.post("/upload_images/:id", upload.fields([{ name: 'main', maxCount: 1 }, { name: 'gallery', maxCount: 5 }]), validateId, uploadImages)
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;