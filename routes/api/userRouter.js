const router = require("express").Router();
const userController = require("../../controllers/userController");
const verify = require("../../middleware/userVerifyMiddleware");
const checkingPass = require("../../middleware/changePassMiddleware");
const validateId = require("../../middleware/userMiddleware");
const auth = require("../../middleware/authMiddleware");



router.post("/registration", userController.registration);
router.post("/login", verify, userController.login);

router.get("/verify_email/:id/:token", validateId, userController.verifyEmail);
router.put("/change_pass", auth,  checkingPass, userController.changePassword);

module.exports = router;