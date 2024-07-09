import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Blacklist } from "../models/Blacklist.js";
const router = express.Router();
// Generate a secure JWT secret
const generateJWTSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};
// Use the generated secret
const JWT_SECRET = generateJWTSecret();

// -------------------------------------------------------------------------------------------------------
router.post("/login", async (req, res) => {
  const { user_Id, password } = req.body;

  try {
    // Find user by email or mobile
    const user = await User.findOne({
      $or: [{ email: user_Id }, { mobile: user_Id }],
    });

    if (!user) {
      return res
        .status(404)
        .send({ message: "No user found. Please register." });
    }

    // Check if user is blacklisted
    if (user.isBlacklisted) {
      return res
        .status(403)
        .send({ message: "User is blacklisted. Please contact admin." });
    }

    const emailOrMobileField = user_Id.includes("@")
      ? "Email id"
      : "Mobile number";

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: emailOrMobileField + " or password is incorrect",
      });
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

    // Check if user is blacklisted
    const blacklistedUser = await Blacklist.findOne({
      $or: [{ email: user_Id }, { mobile: user_Id }],
    });
    if (blacklistedUser) {
      return res.status(403).send({
        message: "Your account has been blocked. Please contact Admin",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const emailOrMobileField = user_Id.includes("@")
      ? { email: user_Id }
      : { mobile: user_Id };

    // Create new user
    const newUser = new User({
      name,
      confirmpassword: hashedPassword,
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
router.put("/update/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { email, mobile, password } = request.body;

    // Create a filter to check for existing email or mobile if they are being updated
    const filter = [];
    if (email) {
      filter.push({ email: email, _id: { $ne: id } });
    }
    if (mobile) {
      filter.push({ mobile: mobile, _id: { $ne: id } });
    }

    // Check for existing email or mobile
    if (filter.length > 0) {
      const existingUser = await User.findOne({
        $or: filter,
      });
      if (existingUser) {
        return response.status(409).send({ message: "Existing Data" });
      }
    }

    // Hash the password if it is provided
    let updatedUser = { ...request.body };
    if (password) {
      updatedUser.password = await bcrypt.hash(password, 10);
    }

    // Update user
    const result = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });
    if (!result) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).send({
      message: "User updated successfully",
      User: result,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route to delete a User - DELETE
router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      return response.status(404).send({
        message: "User not found",
      });
    }

    // Add user details to Blacklist
    const blacklistedUser = new Blacklist({
      name: userToDelete.name,
      email: userToDelete?.email,
      mobile: userToDelete?.mobile,
    });

    await blacklistedUser.save();

    // Update isBlacklisted in User collection
    await User.findByIdAndUpdate(id, { isBlacklisted: true });

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
