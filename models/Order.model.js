const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        itemName: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalPrice: Number,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
