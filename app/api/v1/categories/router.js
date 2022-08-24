const router = require("express").Router(),
  { getAllCategory, getOneCategory, createCategory, updateCategory, deleteCategory } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth");

router.get("/", authenticateUser, getAllCategory);
router.get("/:id", authenticateUser, getOneCategory);
router.post("/", authenticateUser, createCategory);
router.put("/:id", authenticateUser, updateCategory);
router.delete("/:id", authenticateUser, deleteCategory);

module.exports = router;
