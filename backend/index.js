import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import productsRoute from "./routes/productsRoute.js";
import cors from "cors";
const app = express();

// Middleware for parsing request body
app.use(express.json());
// Middleware for handling CORS POLICY
// this will allow all origins
//app.use(cors());
// allow specific origins
app.use(
  cors({
    origin: "https://mern-app-ekf3.vercel.app",
  })
);
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
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
