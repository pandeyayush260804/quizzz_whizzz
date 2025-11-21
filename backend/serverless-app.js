import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';

import { indexRoute } from './api/v1/routes/index.js';
import { Error404 } from './util/middlewares/404.js';

import { createConnection } from './util/db/connection.js';
import { createQuesConnection } from './util/db/ques-connection.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', indexRoute);

// 404
app.use(Error404);

// ------- DB CONNECTION LOGIC FOR SERVERLESS + LOCAL -------
let isDbConnected = false;

export const ensureDb = async () => {
  if (isDbConnected) return;

  try {
    await createConnection();
    console.log("🟢 quizdb connected");

    await createQuesConnection();
    console.log("🟢 quesdb connected");

    isDbConnected = true;
  } catch (err) {
    console.log("❌ DB connection error:", err);
    throw err;
  }
};

// Export express app
export default app;
