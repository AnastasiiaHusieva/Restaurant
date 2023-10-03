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
      const totalAmount = userObject.cart.reduce(
        (total, item) => total + item.itemPrice,
        0
      );
      const uniqueCartItems = userObject.cart.filter((item, index, arr) => {
        return index === arr.findIndex((i) => i._id === item._id);
      }); // i need to study this code
      console.log(`@@@@@@!!!!!!!!!!`, userObject._id);
      res.render("checkout", { userObject, totalAmount, uniqueCartItems });
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
