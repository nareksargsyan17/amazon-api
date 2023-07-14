const router = require("express").Router();

const authRouter = require("./api/auth");
const guestRouter = require("./api/guest");

router.use("/auth", authRouter);
router.use("/guest", guestRouter);


module.exports = router;