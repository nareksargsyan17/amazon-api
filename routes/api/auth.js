const router = require("express").Router();

const productRouter = require("./auth/user/productRouter");
const userRouter = require("./auth/user/userRouter");
const addressRouter = require("./auth/user/addressRouter");
const orderRouter = require("./auth/user/orderRouter");
const cartRouter = require("./auth/user/cartRouter");
const auth = require("../../middleware/authMiddleware");

router.use(auth);


router.use("/orders", orderRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/addresses", addressRouter);
router.use("/cart", cartRouter);


module.exports = router;