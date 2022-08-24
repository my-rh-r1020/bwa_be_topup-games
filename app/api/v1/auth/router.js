const router = require("express").Router(),
  { signup, signin } = require("./controller");

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
