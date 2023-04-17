const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    products: [
      {
        product_id: { type: String },
        title: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        image: { type: String },
        description: { type: String },
        shortDescription: { type: String },
      },
    ],
    total_price: { type: Number },
    is_checked_out: { type: Boolean,default:false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carts", cartSchema);
