const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema(
  {
    itemName: String,

    itemDescription: String,

    itemCategory: String,

    itemPrice: Number,

    itemImageURL: String,
  }
  //   ,

  //   {
  //     timestamps: true,
  //   }
);
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
