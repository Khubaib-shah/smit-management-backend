import express from "express";
import Teacher from "../models/Teacher.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// create teacher
const createTeacher = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Name, email, and password are required",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
      role: role || "teacher",
    });

    const savedTeacher = await newTeacher.save();
    res
      .status(201)
      .json({ message: "Teacher created successfully", data: savedTeacher });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }
    res.status(500).json({ error: `Failed to create Teacher: ${err.message}` });
  }
};

// get all teacher
const getAllTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.find();
    res.json(teacher);
  } catch (err) {
    res.status(500).send("ERROR FROM Teacher GET API", err.message);
  }
};

// get specific teacher
const getSingleTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    res.json(teacher);
  } catch (err) {
    res.status(500).send("ERROR FROM Teacher GET API", err.message);
  }
};

// update specific teacher
const updateTeacher = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "Invalid ID format" });
    }
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(teacher);
  } catch (err) {
    res.status(500).send("ERROR FROM Teacher GET API", err.message);
  }
};

// delete specific teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    res.json("Teacher deleted");
  } catch (err) {
    res.status(500).send("ERROR FROM Teacher GET API", err.message);
  }
};

export {
  createTeacher,
  getAllTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
};
