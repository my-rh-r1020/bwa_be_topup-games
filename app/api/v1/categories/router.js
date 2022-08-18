const router = require("express").Router(),
  { getAllCategory } = require("./controller");

router.get("/", getAllCategory);
