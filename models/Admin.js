import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Pleas add your name"] },
    email: {
      type: String,
      required: [true, "Please add the email address"],
      unique: true,
    },
    password: { type: String, required: [true, "Please add the password"] },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
