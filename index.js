import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import adminRouter from "./route/adminRoute.js";
import teacherRouter from "./route/teacherRoute.js";
import studentRoute from "./route/studentRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Admin
app.use("/api/admin", adminRouter);

// Teacher
app.use("/api/teacher", teacherRouter);

//  Student
app.use("/api/student", studentRoute);
