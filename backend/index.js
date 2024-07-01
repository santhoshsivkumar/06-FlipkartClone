import express from "express";
import { AccessURL, PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import productsRoute from "./routes/productsRoute.js";
import cors from "cors";
import path from "path"; // Import path module for handling file paths
import { fileURLToPath } from "url"; // Import fileURLToPath function

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Define __dirname using import.meta.url

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(
  cors({
    origin: AccessURL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (request, response) => {
  return response.status(234).json("Welcome");
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
