import { quizModel } from "../model/quiz-model.js";

// Create a new quiz
export const createQuiz = async (quizObject) => {
  try {
    const doc = await quizModel.create(quizObject);

    if (doc && doc._id) {
      return { message: "Quiz created successfully.", quiz: doc };
    } else {
      throw new Error("Quiz creation failed.");
    }
  } catch (err) {
    throw err;
  }
};

// Fetch all quizzes
export const getAllQuizzes = async () => {
  try {
    const quizzes = await quizModel.find();
    return quizzes;
  } catch (err) {
    throw err;
  }
};
