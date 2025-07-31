// import express from "express";
// import { quizModel } from "../../../model/quiz-model.js";

// const router = express.Router();

// // Create a new quiz
// router.post("/quiz", async (req, res) => {
//   const { title, questions } = req.body;

//   try {
//     const quiz = await quizModel.create({ title, questions });
//     res.status(201).json(quiz);
//   } catch (err) {
//     console.error("Quiz creation error:", err);
//     res.status(500).json({ error: "Failed to create quiz" });
//   }
// });

// // Get all quizzes
// router.get("/quiz", async (req, res) => {
//   try {
//     const quizzes = await quizModel.find();
//     res.status(200).json(quizzes);
//   } catch (err) {
//     console.error("Fetch all quizzes error:", err);
//     res.status(500).json({ error: "Failed to fetch quizzes" });
//   }
// });

// // Search quizzes by title
// router.get("/quiz/search", async (req, res) => {
//   const { q } = req.query;

//   try {
//     const quizzes = await quizModel.find({
//       title: { $regex: q, $options: "i" },
//     });
//     res.status(200).json(quizzes);
//   } catch (err) {
//     console.error("Quiz search error:", err);
//     res.status(500).json({ error: "Search failed" });
//   }
// });

// export default router;
import express from "express";
import { createQuiz, getAllQuizzes } from "../../../controllers/quiz-controller.js";

const router = express.Router();

router.post("/quiz", createQuiz);        // For creating quiz
router.get("/quiz", getAllQuizzes);      // For fetching all quizzes

export default router;

