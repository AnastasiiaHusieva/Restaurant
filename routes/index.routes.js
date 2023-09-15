const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;

router.get ("/order", (req,res) => {
  res.render("track-order")
})


// this is a test comment to see if I can push to github