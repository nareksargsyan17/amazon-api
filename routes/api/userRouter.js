const router = require("express").Router();
const userController = require("../../controllers/userController");
// const validateId = require("../../middleware/sizeMiddleware");




router.post("/registration", userController.registration);
// router.get("/get_all", userController.getAllSizes);
//
// router.use("/:id", validateId);
//
// router.get("/get/:id", userController.getSize);
// router.put("/update/:id", userController.updateSize);
// router.delete("/delete/:id", userController.deleteSize);

module.exports = router;