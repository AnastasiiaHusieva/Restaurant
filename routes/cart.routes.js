const express = require("express");
const router = express.Router();
const Item = require("../models/ItemsAdmin.model");
const User = require("../models/User.model");

router.post("/", async (req, res) => {
  if (!req.session.currentUser) {
    res.redirect("/auth/signup");
    return;
  }

  const userId = req.session.currentUser._id;
  const { itemId, target } = req.body; // Assuming you have an itemId from the form
  try {
    // Update the user's cart by pushing the itemId (ObjectId) into the cart array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { cart: itemId } }, // Use $push to add the itemId to the cart array
      { new: true }
    );
    if (!updatedUser) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    // Optionally, you can send a response back to the client to indicate success
    console.log("Updated user:", updatedUser);
    res.redirect(`/#${target}`);
  } catch (error) {
    console.error("Error updating user's cart:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/json", (req, res) => {
  const userId = req.session.currentUser._id;
  // console.log("************* ", userId);
  User.findById(userId)
    .populate("cart")
    .then((userObject) => {
      console.log(`@@@@@@`, userObject);
      res.json({ userObject });
    });
});
router.get("/", (req, res) => {
  const userId = req.session.currentUser._id;
  // console.log("************* ", userId);
  User.findById(userId)
    .populate("cart")
    .then((userObject) => {
      // console.log(`@@@@@@`, userObject);
      res.render("cart");
    });
});

router.get("/:itemId", (req, res, next) => {
  const userId = req.session.currentUser._id;
  const itemId = req.params.itemId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        console.log("User not found.");
        return res.status(404).json({ message: "User not found" });
      }
      // Find the index of the item with the specified itemId in the user’s cart
      const itemIndex = user.cart.indexOf(itemId);
      if (itemIndex === -1) {
        console.log("Item not found in the users cart.");
        return res.status(404).json({ message: "Item not found in the cart" });
      }

      user.cart.splice(itemIndex, 1);

      return user.save();
    })
    .then((updatedUser) => {
      console.log("Item removed from cart:", updatedUser);
      res.redirect("/cart"); // Redirect back to the cart page
    })
    .catch((error) => {
      console.error("Error removing item from cart:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

module.exports = router;
