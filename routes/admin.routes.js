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
  const {
    itemName,
    itemDescription,
    itemCategory,
    itemPrice,
    itemNumber,
    itemImageURL,
  } = req.body;
  console.log("*********");

  ItemsAdmin.create({
    itemName,
    itemDescription,
    itemCategory,
    itemPrice,
    itemNumber,
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

router.get("/add-meals-form/:id", (req, res, next) => {
  const id = req.params.id;
  ItemsAdmin.findByIdAndDelete(id)
    .then((data) => {
      console.log(data);
      res.redirect(`/admin/add-meals-form`);
    })
    .catch((err) => {
      next(err);
    });
});
router.get("/add-meals-form/edit/:id", (req, res, next) => {
  const id = req.params.id;

  ItemsAdmin.findById(id).then((datatoUpdate) => {
    console.log("you selected id####:", datatoUpdate);
    res.render("admin/mealupdate", { datatoUpdate });
  });
});
router.post("/add-meals-form/edit/:id", (req, res, next) => {
  const {
    itemName,
    itemDescription,
    itemCategory,
    itemPrice,
    itemNumber,
    itemImageURL,
  } = req.body;
  const id = req.params.id;
  const update = {
    itemName,
    itemDescription,
    itemCategory,
    itemPrice,
    itemNumber,
    itemImageURL,
  };
  // const filter = { _id: id };

  ItemsAdmin.findByIdAndUpdate(id, update, { new: true })
    .then((item) => {
      console.log("this is the updated item :", item);
      res.redirect("/admin/add-meals-form");
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
