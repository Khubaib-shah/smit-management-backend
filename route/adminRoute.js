import express from "express";
import {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controler/adminController.js";

const router = express.Router();

// create admin & get specific admin
router.route("/").post(createAdmin).get(getAllAdmin);

// get specific admin &  update specific admin & delete specific admin
router.route("/:id").get(getSingleAdmin).put(updateAdmin).delete(deleteAdmin);

export default router;
