const express = require("express");
const router = express.Router();
const Order = require("../models/Order.model");
const User = require("../models/User.model");
const isAdmin = require("../middleware/isAdmin");

router.get("/", isAdmin, (req, res) => {
  Order.find().then((userOrders) => {
    console.log("ACA ACA ACA !!!!!!!", userOrders);
    const cart = userOrders.map((order) => order.items);
    console.log(cart);
    res.render("admin/adminOrderStatus", { userOrders, cart });
  });
});
module.exports = router;
