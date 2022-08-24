const router = require("express").Router(),
  { getAllNominals, getOneNominal, createNominal, updateNominal, deleteNominal } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth");

router.get("/", authenticateUser, getAllNominals);
router.get("/:id", authenticateUser, getOneNominal);
router.post("/", authenticateUser, createNominal);
router.put("/:id", authenticateUser, updateNominal);
router.delete("/:id", authenticateUser, deleteNominal);

module.exports = router;
