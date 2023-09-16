const express = require("express");
const router = express.Router();
const Item = require("../models/ItemsAdmin.model");

/* GET home page */
router.get("/", (req, res, next) => {
  let isLoggedIn = req.session.currentUser;
  if (isLoggedIn) {
    res.render("index", { isLoggedIn: true });
  } else if (!isLoggedIn) {
    res.render("index", { isLoggedIn: false });
  }
});

router.get("/order", (req, res) => {
  res.render("track-order");
});
// this is a test comment to see if I can push to github

// cart routes
router.get("/cart", (req, res, next) => {
  res.render("cart", { data });
});

router.get("/products", (req, res, next) => {
  Item.find().then((items) => {
    res.json(items);
  });
});

module.exports = router;
