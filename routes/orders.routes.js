const express = require("express");
const router = express.Router();
const Order = require("../models/Order.model");
const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", (req, res) => {
  const userId = req.session.currentUser._id;

  Order.findOne({ contact: userId }).then((orderItems) => {
    console.log("AAAAAHAHAHAHAHAHAHAHAHAHAH", orderItems);
    if (!orderItems) {
      User.findOneById(userId);
      console
        .log("UUUUUUSSSSSSEEEEEEERRRRRRRRRIIIIIDDDDD", userId)
        .populate("cart")
        .then((userObject) => {
          if (!userObject) {
            return res.status(404).json({ message: "User not found" });
          }
          const orderData = {
            contact: userObject._id,
            items: userObject.cart,
          };
          Order.create(orderData)
            .then((order) => {
              if (order) {
                console.log("!!!!!!!!!", order);
                User.findOneAndUpdate(
                  { _id: userId },
                  { $set: { cart: [] } },
                  { new: true }
                ).then((updatedCart) => {
                  if (updatedCart) {
                    res.render("track-order", { order });
                  }
                });
              } else console.log("the order was not created");
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
    } else {
      res.render("track-order", { orderItems });
    }
  });
});

// //////////////////////////////////////////////////

// router.get("/", isLoggedIn, (req, res) => {
//   const userId = req.session.currentUser._id;

//   User.findById(userId)
//     .populate("cart")
//     .then((userObject) => {
//       const orderData = {
//         contact: userObject._id,

//         items: userObject.cart,
//       };

//       Order.create(orderData)

//         .then((order) => {
//           if (order) {
//             console.log("!!!!!!!!!", order);
//             User.findOneAndUpdate(
//               { _id: userId },
//               { $set: { cart: [] } },
//               { new: true }
//             ).then((updatedCart) => {
//               if (updatedCart) {
//                 Order.find({ contact: userId }).then((orderItems) => {
//                   console.log("RRRRRRRRRRRRRR", orderItems.items);
//                   res.render("track-order", { orderItems });
//                 });
//               }
//             });
//           } else console.log("the order was not created");
//         })
//         .catch((error) => {
//           console.error("Error creating order:", error);
//           res.status(500).json({ message: "Internal Server Error" });
//         });
//     })
//     .catch((err) => {
//       console.error("Error finding user:", err);
//       res.status(500).json({ message: "Internal Server Error" });
//     });
// });

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
