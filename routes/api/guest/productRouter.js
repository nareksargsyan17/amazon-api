const router = require("express").Router();
const { getAllPublishedProducts, getProductById } = require("../../../controllers/productController.js");
const validateId = require("../../../middleware/productMiddleware");
const validateCategoryId = require("../../../middleware/categoryMiddleware")
const {getCartProducts} = require("../../../controllers/productController");

router.get("/get/:id", validateId, getProductById);


router.get("/get_all_published/:id", validateCategoryId, getAllPublishedProducts);
router.post("/get_cart_products", getCartProducts)

module.exports = router;