const router = require("express").Router();
const { registration, login, verifyEmail } = require("../../../controllers/userController");
const verify = require("../../../middleware/userVerifyMiddleware");
const validateId = require("../../../middleware/userMiddleware");

router.post("/registration", registration);
router.post("/login", verify, login);

router.get("/verify_email/:id/:token", validateId, verifyEmail);

module.exports = router;