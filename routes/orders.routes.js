const express = require("express");
const router = express.Router();
const Order = require("../models/Order.model");
const User = require("../models/User.model");

router.get("/", (req, res) => {
  const userId = req.session.currentUser._id;

  User.findById(userId)
    .populate("cart")
    .then((userObject) => {
      const orderData = {
        contact: userObject._id,

        items: userObject.cart,
      };

      return Order.create(orderData)
        .then((order) => {
          console.log("!!!!!!!!!", order);
          res.render("track-order", { order });
        })
        .catch((error) => {
          console.error("Error creating order:", error);
          res.status(500).json({ message: "Internal Server Error" });
        });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

module.exports = router;
//const progressRound = window.querySelector(‘.progress-round’);
// Function to update the progress indicator position
// function updateProgressIndicator(status) {
//   switch (status) {
//     case 'Confirmed':
//       progressRound.style.left = '0%';
//       break;
//     case 'Preparation':
//       progressRound.style.left = '25%';
//       break;
//     case 'On the way':
//       progressRound.style.left = '50%';
//       break;
//     case 'Delivered':
//       progressRound.style.left = '75%';
//       break;
//     default:
//       break;
//   }
// }
