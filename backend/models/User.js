import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
  {
    name: String,
    pincode: String,
    city: String,
    state: String,
    mobile: String,
    locality: String,
    landmark: String,
    address: String,
    alternatePhone: String,
    addressType: {
      type: String,
      default: "Home",
    },
  },
  { _id: true }
);
const cartSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  productName: {
    type: String,
  },
  company: String,
  category: String,
  seller: String,
  productDescription: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  productImage: {
    type: String, // Assuming you store the file path or URL in the database
  },
});

const orderSchema = new mongoose.Schema(
  {
    savedPrice: String,
    price30Percent: String,
    orderName: String,
    totalPrice: String,
    orderImage: String,
  },
  {
    timestamps: true,
  }
);
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
    gender: String,
    addressData: [addressSchema],
    cart: [cartSchema],
    order: [orderSchema],
    isBlacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
