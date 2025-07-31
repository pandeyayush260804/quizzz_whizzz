// ques-connection.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const createQuesConnection = async () => {
  return mongoose.createConnection(process.env.QDB_URL, {
    maxPoolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
