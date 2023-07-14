const router = require("express").Router();

const productRouter = require("./auth/user/productRouter");
const categoryRouter = require("./auth/admin/categoryRouter");
const colorRouter = require("./auth/admin/colorRouter");
const sizeRouter = require("./auth/admin/sizeRouter");
const userRouter = require("./auth/user/userRouter");
const addressRouter = require("./auth/user/addressRouter");
const orderRouter = require("./auth/user/orderRouter");
const auth = require("../../middleware/authMiddleware");

router.use(auth);

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/colors", colorRouter);
router.use("/sizes", sizeRouter);
router.use("/users", userRouter);
router.use("/addresses", addressRouter);
router.use("/orders", orderRouter);


module.exports = router;