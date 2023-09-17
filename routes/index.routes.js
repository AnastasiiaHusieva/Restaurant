const express = require("express");
const router = express.Router();
const Item = require("../models/ItemsAdmin.model");

/* GET home page */
router.get("/", (req, res, next) => {
  let isLoggedIn = req.session.currentUser;
  if (isLoggedIn) {
    res.render("index", { isLoggedIn: true });
  } else if (!isLoggedIn) {
    res.render("index", { isLoggedIn: false });
  }
});

router.get("/order", (req, res) => {
  res.render("track-order");
});

// Cart routes

// GET route to display the cart page
router.get("/cart", (req, res) => {
  res.render("cart");
});

// POST route to add an item to the cart
router.post("/cart", (req, res) => {
  const { itemName, itemPrice, itemImageURL, itemQuantity } = req.body;

  // Assuming that your session is properly configured and req.session.cart is an array

  // Perform input validation if needed
  if (!itemName || !itemPrice || !itemImageURL || !itemQuantity) {
    return res.status(400).json({ message: "Invalid input data." });
  }

  // Sanitize data if needed

  // Create an object representing the item to add to the cart
  const itemToAdd = {
    itemName,
    itemPrice,
    itemImageURL,
    itemQuantity,
  };

  // Assuming req.session.cart is an array where you can push the item
  req.session.cart.push(itemToAdd);

  // Redirect to the cart page (you can customize this)
  res.redirect("/cart");
});

// Route to fetch items by category
router.get("/items/:itemCategory", (req, res, next) => {
  Item.find({ itemCategory: req.params.itemCategory })
    .then((items) => {
      if (!items) {
        return res.status(404).json({ message: "No items found for this category." });
      }
      res.json(items);
      console.log("hello! items");
    })
    .catch((error) => {
      console.error("Error fetching items:", error);
      res.status(500).json({ message: "Internal server error." });
    });
});

module.exports = router;
