const express = require("express");
const router = express.Router();
const Order = require("../models/Order.model");
const User = require("../models/User.model");
const isAdmin = require("../middleware/isAdmin");

router.get("/",isAdmin, (req, res, next) => {
  Order.find().then((userOrders) => {
    console.log("ACA ACA ACA !!!!!!!", userOrders);
    res.render("admin/adminOrderStatus", { userOrders });
  });
});
module.exports = router;
