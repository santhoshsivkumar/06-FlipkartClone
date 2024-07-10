import express from "express";
const router = express.Router();
import { User } from "../models/User";

router.post("/order/:id", async (req, res) => {
  const { id } = req.params;
  const newOrder = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found " });
    }

    user.order.push(newOrder);
    await user.save();

    res.status(200).send({ message: "Order placed successfully", newOrder });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Server error. Please try again later.", newOrder });
  }
});
