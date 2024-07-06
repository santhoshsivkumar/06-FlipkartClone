import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    mobile: {
      type: String,
      sparse: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmpassword: {
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
