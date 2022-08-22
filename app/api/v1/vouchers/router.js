const router = require("express").Router(),
  { getAllVouchers, getOneVoucher, createVoucher, updateVoucher, deleteVoucher } = require("./controller"),
  upload = require("../../../middlewares/multer-thumbnail");

router.get("/", getAllVouchers);
router.get("/:id", getOneVoucher);
router.post("/", upload.single("thumbnail"), createVoucher);
router.put("/:id", upload.single("thumbnail"), updateVoucher);
router.delete("/:id", deleteVoucher);

module.exports = router;
