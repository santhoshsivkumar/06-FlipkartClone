import express from "express";
const router = express.Router();
import { User } from "../models/User";

router.post("/orders/:id", async (req, res) => {
  const { id } = req.params;
  const newOrder = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.orders.push(newOrder); // Ensure 'orders' is the correct field name in the User schema
    await user.save();

    res.status(200).send({ message: "Order placed successfully", newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});

export default router;
