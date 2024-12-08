import express from "express";
import {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controler/adminController.js";

const router = express.Router();

// create admin
router.route("/").post(createAdmin);

// get specific admin
router.route("/").get(getAllAdmin);

// get specific admin
router.route("/:id").get(getSingleAdmin);

// update specific admin
router.route("/:id").put(updateAdmin);

// delete specific admin
router.route("/:id").delete(deleteAdmin);

export default router;
