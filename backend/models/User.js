import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: String,
    address: String,
    city: String,
    state: String,
    country: String,
    pincode: Number,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
