const router = require("express").Router();
const { addToCartBulk, addToCart } = require("../../../../controllers/cartController");
const auth = require("../../../../middleware/authMiddleware");

router.use(auth);

router.post("/add", addToCart);

module.exports = router;