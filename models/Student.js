import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "student" },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    assignments: [
      {
        assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
        submittedOn: { type: Date },
        status: {
          type: String,
          enum: ["submitted", "pending"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
