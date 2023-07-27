const router = require("express").Router();
const { addAddress, chooseMain, getAllAddresses, deleteAddress} = require("../../../../controllers/addressController");
const auth = require("../../../../middleware/authMiddleware");


router.use(auth);

router.post("/add", addAddress);
router.put("/update/:id", chooseMain);
router.get("/get_all", getAllAddresses);
router.delete("/delete/:id", deleteAddress);

module.exports = router;