const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Item = require("../models/ItemsAdmin.model");

router.get("/", (req, res) => {
  const userId = req.session.currentUser._id;
  console.log("************* ", userId);
  User.findById(userId)
    .populate("cart")
    .then((userObject) => {
      console.log(`@@@@@@`, userObject);
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
