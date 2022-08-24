const router = require("express").Router(),
  { getAllBanks, getOneBank, createBank, updateBank, deleteBank } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth"),
  upload = require("../../../middlewares/multer-imgBank");

router.get("/", authenticateUser, getAllBanks);
router.get("/:id", authenticateUser, getOneBank);
router.post("/", authenticateUser, upload.single("imgBank"), createBank);
router.put("/:id", authenticateUser, upload.single("imgBank"), updateBank);
router.delete("/:id", authenticateUser, deleteBank);

module.exports = router;
