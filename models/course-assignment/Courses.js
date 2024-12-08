import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    batches: [{ type: String }],
  },
  { timestamps: true }
);

const course = mongoose.model("Caourse", courseSchema);
export default course;
