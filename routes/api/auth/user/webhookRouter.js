const {webhook} = require("../../../../controllers/orderController");
const bodyParser = require("body-parser");
const router = require("express").Router();


router.post("/webhook", bodyParser.raw({type: 'application/json'}),  webhook);


module.exports = router;