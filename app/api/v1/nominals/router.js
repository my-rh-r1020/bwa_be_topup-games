const router = require("express").Router(),
  { getAllNominals, getOneNominal, createNominal, updateNominal, deleteNominal } = require("./controller");

router.get("/", getAllNominals);
router.get("/:id", getOneNominal);
router.post("/", createNominal);
router.put("/:id", updateNominal);
router.delete("/:id", deleteNominal);

module.exports = router;
