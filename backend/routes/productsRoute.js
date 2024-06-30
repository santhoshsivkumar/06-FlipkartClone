import express from "express";
import { ProductModel } from "../models/productModel.js";
const router = express.Router();

// Route for save a New Product - CREATE
router.post("/create", async (request, response) => {
  try {
    const { productName, productDescription, productPrice } = request.body;
    if (!productName || !productDescription || !productPrice) {
      return response.status(400).send({
        message:
          "send all required fields: productName, productDescription, productPrice",
      });
    }
    const newProduct = {
      productName,
      productDescription,
      productPrice,
    };
    const product = await ProductModel.create(newProduct);
    return response.status(201).send(product);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all Products - READ ALL
router.get("/", async (request, response) => {
  try {
    const products = await ProductModel.find({});
    return response.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({
      message: error.message,
    });
  }
});

// Route to get a single Product - READ
router.get("/details/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const product = await ProductModel.findById(id);
    return response.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({
      message: error.message,
    });
  }
});

// Route to update a product
router.put("/edit/:id", async (request, response) => {
  console.log(request);
  try {
    if (
      !request.body.productName ||
      !request.body.productDescription ||
      !request.body.productPrice
    ) {
      return response
        .status(400)
        .send({ message: "Please provide all the required fields." });
    }
    const { id } = request.params;
    const result = await ProductModel.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({
        message: "Product not found",
      });
    }
    return response
      .status(200)
      .send({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({
      message: error.message,
    });
  }
});

// Route to delete a product
router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await ProductModel.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({
        message: "Product not found",
      });
    }
    return response.status(200).send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({
      message: error.message,
    });
  }
});
export default router;
