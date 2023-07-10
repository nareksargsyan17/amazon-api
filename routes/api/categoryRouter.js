const router = require("express").Router();
const categoryController = require("../../controllers/categoryController.js");
const { Category } = require("../../models");

async function validateId(req, res, next) {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (category) {
    req.category = category;
    next();
  } else {
    res.status(404).json({
      message: "id not found"
    })
  }
}


router.post("/addCategory", categoryController.addCategory);
router.get("/getAllCategory", categoryController.getAllCategories);
router.get("/:id/products", validateId, categoryController.getProductsByCategory);
router.get("/getCategory/:id", validateId, categoryController.getCategory);
router.put("/updateCategory/:id", validateId, categoryController.updateCategory);
router.delete("/deleteCategory/:id", validateId, categoryController.deleteCategory);

module.exports = router;