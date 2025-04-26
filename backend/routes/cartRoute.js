import express from "express";
const router = express.Router();
import { User } from "../models/User.js";

// Add item to cart
router.post("/:userId/add", async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send("User not found");

    // @ts-ignore
    const existingItem = user.cart.find((item) => item.productId === productId);
    if (existingItem) {
      // @ts-ignore
      existingItem.quantity++;
    } else {
      // @ts-ignore
      user.cart.push({ ...req.body, quantity: 1 }); // assuming quantity starts from 1
    }

    // @ts-ignore
    await user.save();
    // @ts-ignore
    res.json(user.cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
router.post("/:userId/remove", async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send("User not found");

    // @ts-ignore
    const existingItem = user.cart.find((item) => item.productId === productId);
    // @ts-ignore
    if (existingItem?.quantity > 1) {
      if (existingItem) {
        // @ts-ignore
        existingItem.quantity--;
      } else {
        // @ts-ignore
        user.cart.push({ ...req.body, quantity: 1 }); // assuming quantity starts from 1
      }
    } else {
      // @ts-ignore
      user.cart = user.cart.filter((item) => item.productId !== productId);
    }

    // @ts-ignore
    await user.save();
    // @ts-ignore
    res.json(user.cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Update item quantity in cart
// router.put("/:userId/update", async (req, res) => {
//   const { productId, quantity } = req.body;
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) return res.status(404).send("User not found");

//     // @ts-ignore
//     const item = user.cart.find((item) => item.productId === productId);
//     if (item) {
//       item.quantity = quantity;
//     }

//     // @ts-ignore
//     await user.save();
//     // @ts-ignore
//     res.json(user.cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });

// Remove item from cart
router.delete("/:userId/remove/:productId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send("User not found");

    // @ts-ignore
    user.cart = user.cart.filter(
      (item) => item.productId !== req.params.productId
    );

    // @ts-ignore
    await user.save();
    // @ts-ignore
    res.json(user.cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Route to remove all items from the cart
router.post("/:userId/clear", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send("User not found");

    // Clear the cart
    user.cart = [];

    await user.save();
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
