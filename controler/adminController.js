import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// create admin
const createAdmin = async (req, res) => {
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
    console.log(savedAdmin);
    res
      .status(201)
      .json({ message: "Admin created successfully", data: savedAdmin });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }
    res.status(500).json({ error: `Failed to create admin: ${err.message}` });
  }
};

// get all admins
const getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (err) {
    res.status(500).send("ERROR FROM ADMIN GET API", err.message);
  }
};

// get specific admin
const getSingleAdmin = async (req, res) => {
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
};

// update specific admin
const updateAdmin = async (req, res) => {
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
};

// delete specific admin
const deleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin deleted" });
  } catch (err) {
    res.status(500).send("ERROR FROM ADMIN DELETE API", err.message);
  }
};

export { createAdmin, getAllAdmin, getSingleAdmin, updateAdmin, deleteAdmin };
