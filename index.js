import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connetDb from "./confiig/mongoConnect.js";
import adminRouter from "./route/adminRoute.js";
import teacherRouter from "./route/teacherRoute.js";
import studentRoute from "./route/studentRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
connetDb();

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
