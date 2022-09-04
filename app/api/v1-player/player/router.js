const router = require("express").Router(),
  { signupPlayer, signinPlayer, landingPage, detailPage, checkoutPage, historyTransactions, detailHistoryTransaction, dashboard, profilePlayer, editProfile } = require("./controller"),
  { authenticatePlayer } = require("../../../middlewares/auth"),
  upload = require("../../../middlewares/multer-avatar");

router.post("/player/signup", signupPlayer);
router.post("/player/signin", signinPlayer);
router.get("/player/landing", landingPage);
router.get("/player/game/:id", detailPage);
router.post("/player/checkout", authenticatePlayer, checkoutPage);
router.get("/player/transactions", authenticatePlayer, historyTransactions);
router.get("/player/transactions/detail/:id", authenticatePlayer, detailHistoryTransaction);
router.get("/player/dashboard", authenticatePlayer, dashboard);
// V1
// router.get("/player/profile/:id", authenticatePlayer, profilePlayer);
// router.put("/player/profile/edit/:id", authenticatePlayer, upload.single("avatar"), editProfile);
// V2
router.get("/player/profile", authenticatePlayer, profilePlayer);
router.put("/player/profile/edit", authenticatePlayer, upload.single("avatar"), editProfile);

module.exports = router;
