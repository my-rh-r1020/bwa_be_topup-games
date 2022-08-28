const router = require("express").Router(),
  { signupPlayer, signinPlayer, landingPage, detailPage } = require("./controller");

router.post("/player/auth/signup", signupPlayer);
router.post("/player/auth/signin", signinPlayer);
router.get("/player/landing-page", landingPage);
router.get("/player/detail-page/:id", detailPage);

module.exports = router;
