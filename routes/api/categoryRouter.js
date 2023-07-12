const router = require("express").Router();
const categoryController = require("../../controllers/categoryController.js");
const categoryMiddleware = require("../../middleware/categoryMiddleware");


router.post("/add", categoryController.addCategory);
router.get("/get_all", categoryController.getAllCategories);

router.use("/:id", categoryMiddleware)

router.get("/:id/products", categoryController.getProductsByCategory);
router.get("/get/:id", categoryController.getCategory);
router.put("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;