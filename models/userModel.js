const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: "Username is required",
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: "Email is required",
    },
    password: {
      type: String,
      required: "Password is required",
      trim: true,
    },
    active: {
      type: Boolean,
      default: 1,
    },
    messages: [mongoose.Types.ObjectId],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("User", userSchema);
