const router = require("express").Router();

const authRouter = require("./api/auth");
const adminRouter = require("./api/admin")
const guestRouter = require("./api/guest");

router.use("/user", authRouter);
router.use("/admin", adminRouter)
router.use("/guest", guestRouter);


module.exports = router;