const router = require("express").Router(),
  { getAllPayments, getOnePayment, createPayment, updatePayment, deletePayment } = require("./controller");

router.get("/", getAllPayments);
router.get("/:id", getOnePayment);
router.post("/", createPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
