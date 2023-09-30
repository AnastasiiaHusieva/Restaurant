const express = require("express");
const router = express.Router();
const Order = require("../models/Order.model");
const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, (req, res) => {
  const userId = req.session.currentUser._id;
  console.log("8888888888888888888888888888", userId);
  Order.find({ contact: userId }).then((orderItems) => {
    console.log("here are rendering the users orders", orderItems.length);
    orderItems.forEach((order) => {
      console.log("ooooooooooooo", order.items);
      order.totalPrice = order.items.reduce(
        (total, item) => total + item.itemPrice,
        0
      );
      console.log(order.totalPrice);
    });
    res.render("track-order", { orderItems });
  });
});
router.post("/", (req, res) => {
  const userId = req.body.userId;
  console.log("the IDIIIDDDDD", userId);
  User.findById(userId)
    /// it creates an empty orderONLY when an order as been created and you refresh the page
    .populate("cart")
    .then((userObject) => {
      if (!userObject) {
        return res.status(404).json({ message: "User not found" });
      }
      const orderData = {
        contact: userObject._id,
        items: userObject.cart,
      };
      Order.create(orderData).then((order) => {
        if (order) {
          console.log("!!!!!!!!!", order);
          User.findOneAndUpdate(
            { _id: userId },
            { $set: { cart: [] } },
            { new: true }
          ).then((updatedCart) => {
            if (updatedCart) {
              Order.find({ contact: userId }).then((orderItems) => {
                console.log(
                  "whhhattt doesss thiss ordreerrr havveee ",
                  orderItems
                );
                res.redirect("/order");
              });
            }
          });
        } else console.log("the order was not created");
      });
    });

  // const userId = req.session.currentUser._id;
  // console.log(userId);
  // Order.find({ contact: userId }).then((orderItems) => {
  //   console.log("AAAAAHAHAHAHAHAHAHAHAHAHAH", orderItems.length);
  //   if (orderItems.length === 0 || orderItems.items !== "") {
  //     User.findOne({ _id: userId })

  //       .populate("cart")
  //       .then((userObject) => {
  //         if (!userObject) {
  //           return res.status(404).json({ message: "User not found" });
  //         }
  //         const orderData = {
  //           contact: userObject._id,
  //           items: userObject.cart,
  //         };
  //         Order.create(orderData)
  //           .then((order) => {
  //             if (order) {
  //               console.log("!!!!!!!!!", order);
  //               User.findOneAndUpdate(
  //                 { _id: userId },
  //                 { $set: { cart: [] } },
  //                 { new: true }
  //               ).then((updatedCart) => {
  //                 if (updatedCart) {
  //                   Order.find({ contact: userId }).then((orderItems) => {
  //                     console.log(
  //                       "whhhattt doesss thiss ordreerrr havveee ",
  //                       orderItems
  //                     );
  //                     res.render("track-order", { orderItems });
  //                   });
  //                 }
  //               });
  //             } else console.log("the order was not created");
  //           })
  //           .catch((error) => {
  //             console.error("Error creating order:", error);
  //             res.status(500).json({ message: "Internal Server Error" });
  //           });
  //       })
  //       .catch((err) => {
  //         console.error("Error finding user:", err);
  //         res.status(500).json({ message: "Internal Server Error" });
  //       });
  //   } else {
  //     Order.find({ contact: userId }).then((orderItems) => {
  //       console.log("121234512345123423456", orderItems);
  //       res.render("track-order", { orderItems });
  //     });
  //   }
  // });
});

// //////////////////////////////////////////////////

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
