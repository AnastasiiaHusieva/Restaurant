const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Item = require("../models/ItemsAdmin.model");
const isLoggedIn = require("../middleware/isLoggedIn");
router.get("/", isLoggedIn, (req, res) => {
  const userId = req.session.currentUser._id;

  User.findById(userId)
    .populate("cart")
    .then((userObject) => {
      console.log(`@@@@@@!!!!!!!!!!`, userObject._id);
      res.render("checkout", { userObject });
    });
});

module.exports = router;

// router.get("/checkout", (req, res) => {

//     if (isLoggedIn) {
//       res.render("checkout", { isLoggedIn: true });
//     } else if (!isLoggedIn) {
//       res.render("checkout", { isLoggedIn: false });
//     }
//   });
