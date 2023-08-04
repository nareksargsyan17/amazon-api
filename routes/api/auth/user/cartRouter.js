const router = require("express").Router();
const { getCartsProducts, addToCart, updateCart, deleteCart} = require("../../../../controllers/cartController");


router.post("/add", addToCart);
router.get("/get_carts", getCartsProducts);
router.put("/update/:id", updateCart)
router.delete("/delete/:id", deleteCart)

module.exports = router;