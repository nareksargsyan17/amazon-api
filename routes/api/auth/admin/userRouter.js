const router = require("express").Router();
const {getUser} = require("../../../../controllers/userController");
const auth = require("../../../../middleware/authMiddleware");


router.get("/get/user", getUser);

module.exports = router;