const router = require("express").Router();

const productRouter = require("../api/guest/productRouter");
const categoryRouter = require("../api/guest/categoryRouter");
const colorRouter = require("../api/guest/colorRouter");
const sizeRouter = require("../api/guest/sizeRouter");
const userRouter = require("../api/guest/userRouter");
const cartRouter = require("../api/guest/cartRouter");


router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/colors", colorRouter);
router.use("/sizes", sizeRouter);
router.use("/users", userRouter);
router.use("/cart", cartRouter);



module.exports = router;