const router = require("express").Router();
const { addAddress, chooseMain, getAllAddresses } = require("../../../controllers/addressController");
const auth = require("../../../middleware/authMiddleware");


router.use(auth);

router.post("/add", addAddress);
router.put("/update/:id", chooseMain);
router.get("/get_all", getAllAddresses);

module.exports = router;