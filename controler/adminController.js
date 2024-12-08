import express from "express";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const router = express.Router();

// create admin
router.route("/").post(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
    });

    const savedAdmin = await newAdmin.save();
    res
      .status(201)
      .json({ message: "Admin created successfully", data: savedAdmin });
  } catch (err) {
    res.status(500).json({ error: `Failed to create admin: ${err.message}` });
  }
});

// get all admins
router.route("/").get(async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (err) {
    res.status(500).send("ERROR FROM ADMIN GET API", err.message);
  }
});

// get specific admin
router.route("/:id").get(async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "Invalid ID format" });
    }

    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).send({ error: "Admin not found" });
    }

    res.json(admin);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Internal server error", details: err.message });
  }
});

// update specific admin
router.route("/:id").put(async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "Invalid ID format" });
    }

    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!admin) {
      return res.status(404).send({ error: "Admin not found" });
    }

    res.json(admin);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Internal server error", details: err.message });
  }
});

// delete specific admin
router.route("/:id").delete(async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.send("Admin deleted");
  } catch (err) {
    res.status(500).send("ERROR FROM ADMIN DELETE API", err.message);
  }
});

export default router;
