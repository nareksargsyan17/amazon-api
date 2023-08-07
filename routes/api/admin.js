const router = require("express").Router();
const categoryRouter = require("./auth/admin/categoryRouter");
const colorRouter = require("./auth/admin/colorRouter");
const sizeRouter = require("./auth/admin/sizeRouter")
const userRouter = require("./auth/admin/userRouter")

const auth = require("../../middleware/authMiddleware");
const admin = require("../../middleware/adminMiddleware");

router.use(auth);
router.use(admin);

router.use("/categories", categoryRouter);
router.use("/colors", colorRouter);
router.use("/sizes", sizeRouter);
router.use("/user", userRouter)

module.exports = router;