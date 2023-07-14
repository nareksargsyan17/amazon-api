const router = require("express").Router();
const productController = require("../../../controllers/productController.js");
const validateId = require("../../../middleware/productMiddleware");

router.get("/get_all_published", productController.getAllPublishedProducts);


router.get("/get/:id", validateId, productController.getProductById);

module.exports = router;