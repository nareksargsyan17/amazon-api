const router = require("express").Router();
const {addToCartBulk} = require("../../../controllers/cartController");

router.post("/add_bulk", addToCartBulk);

module.exports = router;