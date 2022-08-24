const router = require("express").Router(),
  { getAllVouchers, getOneVoucher, createVoucher, updateVoucher, deleteVoucher } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth");
upload = require("../../../middlewares/multer-thumbnail");

router.get("/", authenticateUser, getAllVouchers);
router.get("/:id", authenticateUser, getOneVoucher);
router.post("/", authenticateUser, upload.single("thumbnail"), createVoucher);
router.put("/:id", authenticateUser, upload.single("thumbnail"), updateVoucher);
router.delete("/:id", authenticateUser, deleteVoucher);

module.exports = router;
