const categoryController = require("../controllers/categoryController.js");
const router = require("express").Router();

router.post("/addCategory", categoryController.addCategory);
router.get("/getAllCategory", categoryController.getAllCategories);

module.exports = router;