const router = require("express").Router();
const { addProduct, getAllProducts, updateProduct, uploadImages, deleteProduct, removeImage } = require("../../../../controllers/productController");
const upload = require("../../../../config/imageConfig");
const validateId = require("../../../../middleware/productMiddleware");


router.post("/add", addProduct);
router.get("/get_all", getAllProducts);
router.delete("/delete_image/:id", removeImage)

router.use("*/:id", validateId);

router.post("/upload_images/:id", upload.fields([{ name: 'main', maxCount: 1 }, { name: 'gallery', maxCount: 4 }]), validateId, uploadImages)
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;