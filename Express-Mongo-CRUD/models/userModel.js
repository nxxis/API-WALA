const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    address: {
      type: String,
      required: [true, "Please provide your address"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please provide your phone number"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
