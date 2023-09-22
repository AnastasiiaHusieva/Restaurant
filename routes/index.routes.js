const express = require("express");
const router = express.Router();
const Item = require("../models/ItemsAdmin.model");
const UserDB = require("../models/User.model");

/* GET home page */

router.get("/", (req, res, next) => {
  let isLoggedIn = req.session.currentUser;
  Item.find()
    .then((items) => {
      // Group items by category
      const itemsByCategory = {};
      items.forEach((item) => {
        const category = item.itemCategory;
        if (!itemsByCategory[category]) {
          itemsByCategory[category] = [];
        }
        itemsByCategory[category].push(item);
      });
      // Render the index template with the grouped data
      if (isLoggedIn) {
        res.render("index", { isLoggedIn: true, itemsByCategory });
      } else {
        res.render("index", { isLoggedIn: false, itemsByCategory });
      }
    })
    .catch((err) => {
      console.error("Error finding items by category:", err);
      res.status(500).send("Internal Server Error");
    });
});

// this is a test comment to see if I can push to github

// cart routes
// router.get("/cart", (req, res) => {
//   res.render("cart");
// });
//
// router.post("/cart", (req, res) => {
//   const { itemName, itemPrice, itemImageURL, itemQuantity } = req.body;
//   const item = { itemName, itemPrice, itemImageURL, itemQuantity };
//   req.session.cart.push(item);
//   res.redirect("/cart");
// });

// router.get("/items/:itemCategory", (req, res, next) => {
//   Item.find({ itemCategory: req.params.itemCategory })
//     .then((items) => {
//       if (!items) {
//         return res
//           .status(404)
//           .json({ message: "No items found for this category." });
//       }
//       res.json(items);
//       console.log("hello! items");
//     })
//     .catch((error) => {
//       console.error("Error fetching items:", error);
//       res.status(500).json({ message: "Internal server error." });
//     });
// });

// router.post ('/checkout', async (req, res) => {
//   const userId = req.user.id;
//   const totalPrice = req.body.totalPrice;
//
//   const bonusesToAdd = Math.floor(purchaseAmount / 10);
//
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }
//
//   user.bonuses += bonusesToAdd;
//     await user.save();
//
//   return res.status(200).json({ message: "Bonuses updated successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

module.exports = router;
