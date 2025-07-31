// server.js
import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';

import { indexRoute } from './api/v1/routes/index.js';
import { Error404 } from './util/middlewares/404.js';
import { createConnection } from './util/db/connection.js';
import { createQuesConnection } from './util/db/ques-connection.js';


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', indexRoute);

// 404 Handler
app.use(Error404);

// Connect to MongoDB and start server
// const startServer = async () => {
//   try {
//     await createConnection().then(() => {
//       console.log("🟢 Connected to quizdb");
//     });
//     console.log(chalk.greenBright.bold('✅ DB Connected Successfully'));
//     createQuesConnection().then(() => {
//       console.log("🟢 Connected to quesdb");
//     });
//     console.log(chalk.greenBright.bold('✅ QUES DB Connected Successfully'));

//     const PORT = process.env.PORT || 7777;
//     const server = app.listen(PORT, () => {
//       console.log(chalk.greenBright.bold(`🚀 QuizWhizz Server running at http://localhost:${PORT}`));
//     });

//   } catch (err) {
//     console.error(chalk.redBright.bold('❌ DB Connection Failed'), err);
//   }
// };
const startServer = async () => {
  try {
    await createConnection();
    console.log("🟢 Connected to quizdb");
    console.log(chalk.greenBright.bold('✅ DB Connected Successfully'));

    // Option 1 (if async)
    await createQuesConnection();
    // Option 2 (if sync)
    // createQuesConnection();
    console.log("🟢 Connected to quesdb");
    console.log(chalk.greenBright.bold('✅ QUES DB Connected Successfully'));

    const PORT = process.env.PORT || 7777;
    app.listen(PORT, () => {
      console.log(chalk.greenBright.bold(`🚀 QuizWhizz Server running at http://localhost:${PORT}`));
    });

  } catch (err) {
    console.error(chalk.redBright.bold('❌ DB Connection Failed'), err);
  }
};


startServer();
