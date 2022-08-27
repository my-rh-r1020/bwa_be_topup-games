const router = require("express").Router(),
  { signupPlayer, signinPlayer, landingPage } = require("./controller");

router.post("/player/auth/signup", signupPlayer);
router.post("/player/auth/signin", signinPlayer);
router.get("/player/landing-page", landingPage);

module.exports = router;
