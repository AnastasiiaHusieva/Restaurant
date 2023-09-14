const express = require("express");

const router = express.Router();
const ItemsAdmin = require("../models/ItemsAdmin.model");

router.get("/add-meals-form", (req, res, next) => {
  console.log("***************");
  ItemsAdmin.find().then((dataFood) => {
    console.log("this are all the items", dataFood);
    res.render("admin/admin", { dataFood });
  });
});

router.post("/add-meals-form", (req, res, next) => {
  const { itemName, itemDescription, itemCategory, itemPrice, itemImageURL } =
    req.body;
  console.log("*********");

  ItemsAdmin.create({
    itemName,
    itemDescription,
    itemCategory,
    itemPrice,
    itemImageURL,
  })
    .then((createdProduct) => {
      console.log(`Your ${createdProduct} was successfully created!`);
      res.redirect("/admin/add-meals-form"); // Redirect after creating the product
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
