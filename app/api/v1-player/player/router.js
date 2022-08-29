const router = require("express").Router(),
  { signupPlayer, signinPlayer, landingPage, detailPage, getAllCategories } = require("./controller");

router.post("/player/signup", signupPlayer);
router.post("/player/signin", signinPlayer);
router.get("/player/landing-page", landingPage);
router.get("/player/detail-page/:id", detailPage);

module.exports = router;
