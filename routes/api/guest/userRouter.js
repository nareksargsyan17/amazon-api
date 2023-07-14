const router = require("express").Router();
const userController = require("../../../controllers/userController");
const verify = require("../../../middleware/userVerifyMiddleware");
const validateId = require("../../../middleware/userMiddleware");

router.post("/registration", userController.registration);
router.post("/login", verify, userController.login);

router.get("/verify_email/:id/:token", validateId, userController.verifyEmail);

module.exports = router;