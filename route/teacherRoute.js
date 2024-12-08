import express from "express";
import {
  createTeacher,
  getAllTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controler/teacherController.js";

const router = express.Router();

// create teacher
router.route("/").post(createTeacher);

// get all teacher
router.route("/").get(getAllTeacher);

// get specific teacher
router.route("/:id").get(getSingleTeacher);

// update specific teacher
router.route("/:id").put(updateTeacher);

// delete specific teacher
router.route("/:id").delete(deleteTeacher);

export default router;
