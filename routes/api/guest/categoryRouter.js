const router = require("express").Router();
const categoryController = require("../../../controllers/categoryController.js");
const categoryMiddleware = require("../../../middleware/categoryMiddleware");



router.get("/get_all", categoryController.getAllCategories);

router.use("/:id", categoryMiddleware)

router.get("/products/:id", categoryController.getProductsByCategory);
router.get("/get/:id", categoryController.getCategory);


module.exports = router;