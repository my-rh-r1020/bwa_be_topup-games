const router = require("express").Router(),
  { signupPlayer, signinPlayer, landingPage, detailPage, checkoutPage } = require("./controller");

router.post("/player/signup", signupPlayer);
router.post("/player/signin", signinPlayer);
router.get("/player/landing", landingPage);
router.get("/player/game/:id", detailPage);
router.post("/player/checkout", checkoutPage);

module.exports = router;
