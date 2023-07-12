const router = require("express").Router();



const productRouter = require("./api/productRouter");
const categoryRouter = require("./api/categoryRouter");
const colorRouter = require("./api/colorRouter");
const sizeRouter = require("./api/sizeRouter");
const userRouter = require("./api/userRouter");

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/colors", colorRouter);
router.use("/sizes", sizeRouter);
router.use("/users", userRouter);


module.exports = router;