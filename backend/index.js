import express from "express";
import { PORT, mongoDBURL, AccessURL } from "./config.js";
import mongoose from "mongoose";
import productsRoute from "./routes/productsRoute.js";
import cors from "cors";
import { ProductModel } from "./models/productModel.js";
const app = express();

// Middleware for parsing request body
app.use(express.json());
// Middleware for handling CORS POLICY
// this will allow all origins
//app.use(cors());
// allow specific origins
app.use(
  cors({
    origin: AccessURL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.get("/", async (request, response) => {
  const products = await ProductModel.find({});
  console.log(products);
  return response.status(234).json(products);
});

app.use("/products", productsRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server in running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("App failed to connect to database. Error: " + error);
  });
