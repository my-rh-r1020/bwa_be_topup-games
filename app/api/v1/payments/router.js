const router = require("express").Router(),
  { getAllPayments, getOnePayment, createPayment, updatePayment, deletePayment } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth");

router.get("/", authenticateUser, getAllPayments);
router.get("/:id", authenticateUser, getOnePayment);
router.post("/", authenticateUser, createPayment);
router.put("/:id", authenticateUser, updatePayment);
router.delete("/:id", authenticateUser, deletePayment);

module.exports = router;
