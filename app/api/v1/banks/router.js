const router = require("express").Router(),
  { getAllBanks, getOneBank, createBank, updateBank, deleteBank } = require("./controller"),
  upload = require("../../../middlewares/multer-imgBank");

router.get("/", getAllBanks);
router.get("/:id", getOneBank);
router.post("/", upload.single("imgBank"), createBank);
router.put("/:id", upload.single("imgBank"), updateBank);
router.delete("/:id", deleteBank);

module.exports = router;
