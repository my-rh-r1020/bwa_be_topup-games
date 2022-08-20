const router = require("express").Router(),
  { getAllBanks, getOneBank, createBank, updateBank, deleteBank } = require("./controller");

router.get("/", getAllBanks);
router.get("/:id", getOneBank);
router.post("/", createBank);
router.put("/:id", updateBank);
router.delete("/:id", deleteBank);

module.exports = router;
