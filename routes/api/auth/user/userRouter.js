const router = require("express").Router();
const userController = require("../../../../controllers/userController");
const checkingPass = require("../../../../middleware/changePassMiddleware");
const auth = require("../../../../middleware/authMiddleware");

router.use(auth);

router.put("/change_pass",  checkingPass, userController.changePassword);
router.get("/products", userController.getProducts);

module.exports = router;