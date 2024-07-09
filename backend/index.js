import express from "express";
import { AccessURL, PORT, mongoDBURL } from ".//config/config.js";
import mongoose from "mongoose";
import productsRoute from "./routes/productsRoute.js";
import usersRoute from "./routes/usersRoute.js";
import cors from "cors";
import cartRoute from "./routes/cartRoute.js";

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
app.get("/", (request, response) => {
  return response.status(234).json("Welcome");
});
app.use("/products", productsRoute);
app.use("/users", usersRoute);
app.use("/cart", cartRoute);
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
