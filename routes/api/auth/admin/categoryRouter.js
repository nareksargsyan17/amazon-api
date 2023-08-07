const router = require("express").Router();
const { addCategory, updateCategory, deleteCategory } = require("../../../../controllers/categoryController");
const categoryMiddleware = require("../../../../middleware/categoryMiddleware");

router.post("/add", addCategory);

router.use("*/:id", categoryMiddleware)

router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);


module.exports = router;