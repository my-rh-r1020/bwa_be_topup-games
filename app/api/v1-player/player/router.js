const router = require("express").Router(),
  { signupPlayer, signinPlayer, landingPage, detailPage, checkoutPage, historyTransactions, detailHistoryTransaction, dashboard } = require("./controller"),
  { authenticatePlayer } = require("../../../middlewares/auth");

router.post("/player/signup", signupPlayer);
router.post("/player/signin", signinPlayer);
router.get("/player/landing", landingPage);
router.get("/player/game/:id", detailPage);
router.post("/player/checkout", authenticatePlayer, checkoutPage);
router.get("/player/transactions", authenticatePlayer, historyTransactions);
router.get("/player/transactions/detail/:id", authenticatePlayer, detailHistoryTransaction);
router.get("/player/dashboard", authenticatePlayer, dashboard);

module.exports = router;
