import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

export const createConnection = () => {
  console.log("here");
  return mongoose.connect(process.env.DB_URL, {
    maxPoolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
