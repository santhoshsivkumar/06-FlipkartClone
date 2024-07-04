import express from "express";
import { User } from "../models/User.js";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Users/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });
// Route for saving a Login - existing

router.post("/login", async (req, res) => {
  const { mobile, email, password } = req.body;
  const user = await User.findOne({ $or: [{ mobile }, { email }] });

  if (!user) {
    return res.status(404).send({ message: "No user found, please register" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send({ message: "Password mismatch" });
  }

  const token = jwt.sign({ id: user._id }, "secretkey");
  res.status(200).send({ token });
});

// Route for saving a New User - CREATE
router.post(
  "/register",
  upload.single("UserImage"),
  async (request, response) => {
    try {
      const { name, mobile, password } = request.body;
      // @ts-ignore
      const existingUser = await User.findOne({ mobile });

      if (existingUser) {
        return response
          .status(409)
          .send({ message: "Existing user, please login" });
      }

      const UserImage = request.file ? request.file.path : undefined; // Path to uploaded file

      if (!name || !mobile || !password) {
        return response.status(400).send({
          message: "Send all required fields: name, email, password",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        // @ts-ignore
        mobile,
        password: hashedPassword,
      });
      await newUser.save();
      response.send(200).send({ message: "User registered successfully" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
);

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
router.put(
  "/edit/:id",
  upload.single("UserImage"),
  async (request, response) => {
    try {
      const { id } = request.params;
      const { name, email, password } = request.body;
      const UserImage = request.file ? request.file.path : undefined; // Updated User image if file uploaded

      if (!name || !email || !password) {
        return response
          .status(400)
          .send({ message: "Please provide all the required fields." });
      }

      const updatedUser = {
        ...request.body,
        UserImage,
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
  }
);

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
