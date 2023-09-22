const express = require("express");
const router = express.Router();
const Item = require("../models/ItemsAdmin.model");
const User = require("../models/User.model");
router.get("/", (req, res) => {
  console.log("hola!!");
  res.render("cart").then((data) => {
    console.log("ahahahah", data);
  });
});
router.post("/", async (req, res) => {
  const userId = req.session.currentUser._id;
  const { itemId } = req.body; // Assuming you have an itemId from the form
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
    res.render("cart", { cartItem: itemId });
  } catch (error) {
    console.error("Error updating user's cart:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;