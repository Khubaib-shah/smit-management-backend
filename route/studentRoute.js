import express from "express";
const router = express.Router();
import {
  createStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} from "../controler/studentController.js";
// create Student
router.route("/").post(createStudent);

// get all student
router.route("/").get(getAllStudent);

// get specific student
router.route("/:id").get(getSingleStudent);

// update specific student
router.route("/:id").put(updateStudent);

// delete specific Student
router.route("/:id").delete(deleteStudent);

export default router;
