const router = require("express").Router();
const sizeController = require("../controllers/sizeController");


router.post("/addSize", sizeController.addSize);
router.get("/getAllSizes", sizeController.getAllSizes);
router.get("/getSize/:id", sizeController.getSize);
router.put("/updateSize/:id", sizeController.updateSize);
router.delete("/deleteSize/:id", sizeController.deleteSize);

module.exports = router;