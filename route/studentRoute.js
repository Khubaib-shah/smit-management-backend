import express from "express";
const router = express.Router();
import {
  createStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} from "../controler/studentController.js";

// create Student & get all student & update specific student & delete specific Student

router.route("/").post(createStudent).get(getAllStudent);

// get specific student
router
  .route("/:id")
  .get(getSingleStudent)
  .put(updateStudent)
  .delete(deleteStudent);

export default router;
