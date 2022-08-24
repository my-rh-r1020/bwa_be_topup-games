const router = require("express").Router(),
  { getAllUser } = require("./controller");

router.get("/users", getAllUser);

module.exports = router;
