import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connetDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(process.exit(1), err));
};
export default connetDb;
