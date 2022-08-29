const router = require("express").Router(),
  { getAllGames, getOneGame, createGame, updateGame, deleteGame } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth"),
  upload = require("../../../middlewares/multer-cover");

router.get("/", authenticateUser, getAllGames);
router.get("/:id", authenticateUser, getOneGame);
router.post("/", authenticateUser, upload.single("coverGames"), createGame);
router.put("/:id", authenticateUser, upload.single("coverGames"), updateGame);
router.delete("/:id", authenticateUser, deleteGame);

module.exports = router;
