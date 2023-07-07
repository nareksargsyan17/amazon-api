const categoryController = require("../controllers/categoryController.js");
const router = require("express").Router();

router.post("/addCategory", categoryController.addCategory);
router.get("/getAllCategory", categoryController.getAllCategories);
router.get("/getCategory/:id", categoryController.getCategory);
router.put("/updateCategory/:id", categoryController.updateCategory);
router.delete("/deleteCategory/:id", categoryController.deleteCategory);

module.exports = router;