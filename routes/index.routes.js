const express = require("express");
const router = express.Router();
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
  res.render("cart");
});
module.exports = router;
