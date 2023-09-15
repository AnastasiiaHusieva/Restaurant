const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;

// cart routes
router.get("/cart", (req, res, next) => {
  res.render("cart");
});







// this is a test comment to see if I can push to github