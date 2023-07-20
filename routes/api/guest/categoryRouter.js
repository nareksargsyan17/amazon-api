const router = require("express").Router();
const { getAllCategories, getProductsByCategory, getCategory } = require("../../../controllers/categoryController");
const categoryMiddleware = require("../../../middleware/categoryMiddleware");



router.get("/get_all", getAllCategories);


router.get("/:id/products", categoryMiddleware, getProductsByCategory);
router.get("/get/:id",categoryMiddleware, getCategory);


module.exports = router;