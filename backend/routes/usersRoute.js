import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
//import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { mobile, email, password } = req.body;
  if (!mobile || !email || !password) {
    return res.status(400).send({
      message: "Send all required fields: mobile or email, password",
    });
  }

  const user = await User.findOne({ $or: [{ mobile }, { email }] });
  if (!user) {
    return res.status(404).send({ message: "No user found, please register" });
  }

  // @ts-ignore
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send({ message: "Password mismatch" });
  }

  res.status(200).send({ user: user, msg: "login successful" });
});

// Route for saving a New User - CREATE
router.post("/register", async (request, response) => {
  try {
    const { name, mobile, password } = request.body;
    if (!mobile || !name || !password) {
      return response.status(400).send({
        message: "Send all required fields: name, mobile, password",
      });
    }
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return response
        .status(409)
        .send({ message: "Existing user, please login" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      ...request.body,
      password: hashedPassword,
    };
    await User.create(newUser);
    response.send(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all Users - READ ALL
router.get("/", async (request, response) => {
  try {
    const users = await User.find({});
    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({
      message: error.message,
    });
  }
});

// Route to get a single User - READ
router.get("/details/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);
    return response.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({
      message: error.message,
    });
  }
});

// Route to update a User - UPDATE
router.put("/edit/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response
        .status(400)
        .send({ message: "Please provide all the required fields." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = {
      ...request.body,
      password: hashedPassword,
    };

    const result = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });
    if (!result) {
      return response.status(404).send({
        message: "User not found",
      });
    }

    return response
      .status(200)
      .send({ message: "User updated successfully", User: result });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({
      message: error.message,
    });
  }
});

// Route to delete a User - DELETE
router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({
        message: "User not found",
      });
    }

    return response.status(200).send({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({
      message: error.message,
    });
  }
});

export default router;
