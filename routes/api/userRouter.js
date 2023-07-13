const router = require("express").Router();
const userController = require("../../controllers/userController");
const userMiddleware = require("../../middleware/userMiddleware");
const checkingPass = require("../../middleware/changePassMiddleware");



router.post("/registration", userController.registration);
router.get("/verify_email/:id/:token", userController.verifyEmail);
router.post("/login", userMiddleware, userController.login);
router.put("/change_pass/:id", checkingPass, userController.changePassword);

// router.get("/get_all", userController.getAllSizes);
//
// router.use("/:id", validateId);
//
// router.get("/get/:id", userController.getSize);
// router.delete("/delete/:id", userController.deleteSize);

module.exports = router;