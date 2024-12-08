import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Student from "../models/Student.js";

// create Student
const createStudent = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Name, email, and password are required",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
    });

    const savedStudent = await newStudent.save();
    res
      .status(201)
      .json({ message: "Student created successfully", data: savedStudent });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }
    res.status(500).json({ error: `Failed to create Student: ${err.message}` });
  }
};

// get all student
const getAllStudent = async (req, res) => {
  try {
    const student = await Student.find();
    res.json(student);
  } catch (err) {
    res.status(500).send("ERROR FROM Student GET API", err.message);
  }
};

// get specific student
const getSingleStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(500).send("ERROR FROM Student GET API", err.message);
  }
};

// update specific student
const updateStudent = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "Invalid ID format" });
    }
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(student);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// delete specific Student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.json("Student deleted");
  } catch (err) {
    res.status(500).send("ERROR FROM Student GET API", err.message);
  }
};

export {
  createStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
