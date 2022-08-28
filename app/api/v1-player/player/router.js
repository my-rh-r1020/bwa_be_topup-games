const router = require("express").Router(),
  { signupPlayer, signinPlayer, landingPage, detailPage, getAllCategories } = require("./controller");

router.post("/player/auth/signup", signupPlayer);
router.post("/player/auth/signin", signinPlayer);
router.get("/player/landing-page", landingPage);
router.get("/player/detail-page/:id", detailPage);
router.get("/player/category", getAllCategories);

module.exports = router;
