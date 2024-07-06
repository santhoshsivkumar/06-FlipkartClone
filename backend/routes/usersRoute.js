import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = express.Router();
// Generate a secure JWT secret
const generateJWTSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Use the generated secret
const JWT_SECRET = generateJWTSecret();

router.post("/login", async (req, res) => {
  const { user_Id, password } = req.body;

  if (!user_Id) {
    return res.status(400).send({
      message: "Send either mobile or email",
    });
  }
  if (!password) {
    return res.status(400).send({
      message: "Send password",
    });
  }

  try {
    // Find user by mobile or email
    const user = await User.findOne({
      $or: [{ email: user_Id }, { mobile: user_Id }],
    });

    if (!user) {
      return res
        .status(404)
        .send({ message: "No user found. Please register." });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Password mismatch" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return token to client
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});

// Route for user registration
router.post("/register", async (req, res) => {
  const { name, user_Id, password, confirmpassword } = req.body;

  if (!name || !user_Id || !confirmpassword || !password) {
    return res.status(400).send({
      message: "Send all required fields: name, mobile, email, password",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: user_Id }, { mobile: user_Id }],
    });
    if (existingUser) {
      return res.status(409).send({ message: "Existing user. Please login." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const emailOrMobileField = user_Id.includes("@")
      ? { email: user_Id }
      : { mobile: user_Id };

    // Create new user
    const newUser = new User({
      name,
      confirmpassword,
      password: hashedPassword,
      ...emailOrMobileField,
    });

    await newUser.save();

    res
      .status(201)
      .send({ user: newUser, message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error. Please try again later." });
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
