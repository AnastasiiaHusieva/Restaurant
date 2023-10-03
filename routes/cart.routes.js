const express = require("express");
const router = express.Router();
const Item = require("../models/ItemsAdmin.model");
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
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
router.post("/add", (req, res) => {
  const userId = req.session.currentUser._id;
  const itemId = req.body.itemId;
  console.log("fetchhhhhhh", itemId, userId);

  User.findByIdAndUpdate(
    userId,
    { $push: { cart: itemId } },
    { new: true }
  ).then((user) => {
    console.log("the usersssss", user);
    res.redirect("/cart");
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

router.get("/", isLoggedIn, (req, res) => {
  const userId = req.session.currentUser._id;
  // console.log("************* ", userId);
  User.findById(userId)
    .populate("cart")
    .then((userObject) => {
      // console.log(`@@@@@@`, userObject);
      res.render("cart");
    });
});

module.exports = router;
