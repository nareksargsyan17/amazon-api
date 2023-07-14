const router = require("express").Router();
const { addOrder, getUserOrders } = require("../../../../controllers/orderController");
const auth = require("../../../../middleware/authMiddleware");

router.use(auth);

router.post("/add", addOrder);
router.get("/get_orders", getUserOrders);

module.exports = router;