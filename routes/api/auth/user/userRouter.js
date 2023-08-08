const router = require("express").Router();
const { changePassword, getProducts, getUser} = require("../../../../controllers/userController");
const checkingPass = require("../../../../middleware/changePassMiddleware");
const auth = require("../../../../middleware/authMiddleware");

router.use(auth);
router.get("/get/user", getUser);
router.put("/change_pass",  checkingPass, changePassword);
router.get("/products", getProducts);

module.exports = router;