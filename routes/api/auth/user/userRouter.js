const router = require("express").Router();
const { changePassword, getProducts } = require("../../../../controllers/userController");
const checkingPass = require("../../../../middleware/changePassMiddleware");
const auth = require("../../../../middleware/authMiddleware");

router.use(auth);

router.put("/change_pass",  checkingPass, changePassword);
router.get("/products", getProducts);

module.exports = router;