const express = require("express");
const router = express.Router();
const Item = require("../models/ItemsAdmin.model");
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, (req, res) => {
  const userId = req.session.currentUser._id;
  console.log("hallo!!", userId);
  User.findById(userId)
    .populate("cart")
    .then((userObject) => {
      // console.log(`@@@@@@`, userObject);
      res.render("cart");
    });
});

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
    req.session.currentUser.cart = updatedUser.cart;
    res.redirect(`/#${target}`);
  } catch (error) {
    console.error("Error updating user's cart:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/add", (req, res) => {
  const userId = req.session.currentUser._id;
  const itemId = req.body.itemId;
  console.log("fetchhhhhhh", itemId, userId);

  User.findByIdAndUpdate(userId, { $push: { cart: itemId } }, { new: true })
    .then((user) => {
      req.session.currentUser.cart = user.cart;
      console.log("the usersssss", user);
      res.redirect("/cart");
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      // Handle the error, possibly by sending an error response
      res.status(500).json({ error: "Internal Server Error" });
    });
});
router.post("/pull", (req, res) => {
  const userId = req.session.currentUser._id;
  const itemIdToRemove = req.body.itemId; // Assuming you send a unique identifier
  console.log("reeeeeeeqqqqqqq", req.body);
  // Find the user and their cart
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      req.session.currentUser.cart = user.cart;

      // Find the index of the item to remove in the cart
      const indexToRemove = user.cart.findIndex((item) => {
        console.log("aaaaaaa", itemIdToRemove);

        return JSON.stringify(item._id).split('"')[1] === itemIdToRemove;
      });
      console.log("this is the index", indexToRemove);
      if (indexToRemove === -1) {
        return res.status(404).json({ error: "Item not found in cart" });
      }

      // Remove the item at the specified index
      user.cart.splice(indexToRemove, 1);

      // Save the updated user with the item removed
      user
        .save()
        .then((updatedUser) => {
          console.log("Item removed from cart:", updatedUser.cart);
          res.status(200).json({ message: "Item removed successfully" });
        })
        .catch((error) => {
          console.error("Error saving user:", error);
          res.status(500).json({ error: "Internal server error" });
        });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.get("/json", (req, res) => {
  const userId = req.session.currentUser._id;
  // console.log("************* ", userId);
  User.findById(userId)
    .populate("cart")
    .then((userObject) => {
      // console.log(`@@@@@@`, userObject);
      res.json({ userObject });
    });
});

module.exports = router;
