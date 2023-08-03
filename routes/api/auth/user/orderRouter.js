const router = require("express").Router();
const { addOrder, getUserOrders, session} = require("../../../../controllers/orderController");


router.post("/add", addOrder);
router.post("/create-checkout-session", session);

router.get("/get_orders", getUserOrders);

module.exports = router;