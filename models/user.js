const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter you name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter you email!"],
      trim: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "Please enter you password!"],
    },
    role: {
      type: Number,
      default: 0, // 0 = user, 1 = admin
    },
    avater: {
      type: String,
      default: "public/avatar",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
