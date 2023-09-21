const express = require("express");
const router = express.Router();
const Item = require("../models/ItemsAdmin.model");
router.get("/", (req, res) => {
  res.render("user/cart");
});

module.exports = router;
