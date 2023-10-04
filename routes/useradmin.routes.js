const express = require("express");

const router = express.Router();
const UserDB = require("../models/User.model");

router.get("/", (req, res, next) => {
  console.log("***************");
  UserDB.find().then((dataUser) => {
    console.log("this are all the items", dataUser);
    res.render("admin/useradmin", { dataUser });
  });
});

router.post("/", (req, res, next) => {
  const { username, email, password } = req.body;
  console.log("*********");

  UserDB.create({
    username,
    email,
    password,
  })
    .then((createdProduct) => {
      console.log(`Your ${createdProduct} was successfully created!`);
      res.redirect("/adminusers");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  UserDB.findByIdAndDelete(id)
    .then((data) => {
      console.log(data);
      res.redirect(`/adminusers`);
    })
    .catch((err) => {
      next(err);
    });
});
router.get("/edit/:id", (req, res, next) => {
  const id = req.params.id;

  UserDB.findById(id).then((dataUpdate) => {
    console.log("you selected id####:", dataUpdate);
    res.render("admin/useradminupdate", { dataUpdate });
  });
});
router.post("/edit/:id", (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;
  const id = req.params.id;
  const update = {
    username,
    email,
    password,
    isAdmin,
  };
  // const filter = { _id: id };

  UserDB.findByIdAndUpdate(id, update, { new: true })
    .then((item) => {
      console.log("this is the updated item :", item);
      res.redirect("/adminusers");
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
