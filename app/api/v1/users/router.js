const router = require("express").Router(),
  { getAllUser } = require("./controller");

router.get("/", getAllUser);

module.exports = router;
