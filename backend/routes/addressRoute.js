import express from "express";
const router = express.Router();
import { User } from "../models/User";

router.post("/addAddress/:id", async (req, res) => {
  const { id } = req.params;
  const newAddress = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.addressData.push(newAddress);
    await user.save();

    res.status(200).send({ message: "Address added successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});

router.delete("/deleteAddress/:id/:addressId", async (req, res) => {
  const { id, addressId } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const address = user.addressData.id(addressId);
    if (!address) {
      return res.status(404).send({ message: "Address not found" });
    }

    user.addressData.pull({ _id: addressId });
    await user.save();

    res.status(200).send({ message: "Address deleted successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});

router.put("/updateAddress/:id/:addressId", async (req, res) => {
  const { id, addressId } = req.params;
  const updatedAddress = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const address = user.addressData.id(addressId);
    if (!address) {
      return res.status(404).send({ message: "Address not found" });
    }

    Object.assign(address, updatedAddress);
    await user.save();

    res.status(200).send({ message: "Address updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});
