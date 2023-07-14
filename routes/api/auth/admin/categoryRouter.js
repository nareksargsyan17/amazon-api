const router = require("express").Router();
const categoryController = require("../../../../controllers/categoryController.js");
const categoryMiddleware = require("../../../../middleware/categoryMiddleware");

router.post("/add", categoryController.addCategory);

router.use("/:id", categoryMiddleware)

router.put("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);


module.exports = router;