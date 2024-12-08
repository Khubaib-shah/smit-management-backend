import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Admin from "./models/Admin.js";
import Teacher from "./models/Teacher.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Admin
app.post("/admin", async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  try {
    const newAdmin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || "admin",
    });

    const savedAdmin = await newAdmin.save();
    res.json(savedAdmin);
  } catch (err) {
    res.status(500).send("ERROR FROM ADMIN POST API", err.message);
  }
});

app.get("/admin", async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (err) {
    res.status(500).send("ERROR FROM ADMIN GET API", err.message);
  }
});

app.delete("/admin/:id", async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.send("Admin deleted");
  } catch (err) {
    res.status(500).send("ERROR FROM ADMIN DELETE API", err.message);
  }
});
