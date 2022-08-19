const router = require("express").Router(),
  { getAllCategory, getOneCategory, createCategory, updateCategory, deleteCategory } = require("./controller");

router.get("/", getAllCategory);
router.get("/:id", getOneCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
