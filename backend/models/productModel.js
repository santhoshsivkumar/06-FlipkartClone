import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String, // Assuming you store the file path or URL in the database
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", productSchema);
