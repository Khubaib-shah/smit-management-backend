import express from "express";
import {
  createTeacher,
  getAllTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controler/teacherController.js";

const router = express.Router();

// create teacher &  get all teacher
router.route("/").post(createTeacher).get(getAllTeacher);

// get specific teacher & update specific teacher & delete specific teacher

router
  .route("/:id")
  .get(getSingleTeacher)
  .put(updateTeacher)
  .delete(deleteTeacher);

export default router;
