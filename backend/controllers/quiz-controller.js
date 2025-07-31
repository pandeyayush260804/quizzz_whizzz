import { quizModel } from "../model/quiz-model.js"; // Adjust path as needed

// ✅ Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await quizModel.find();
    res.status(200).json(quizzes); // ✅ Direct array return
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch quizzes", error: err.message });
  }
};

// ✅ Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const quizData = req.body;
    console.log(req.body);

    // Basic validation
    if (!quizData.title || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {

      return res.status(400).json({ success: false, message: "Title and at least one question are required" });

    }
    console.log("jelloregrtfg",quizData)

    // Convert ans (1-4) → correctAnswer ("option1" to "option4")
    const formattedQuestions = quizData.questions.map((q, idx) => {
      if (!q.correctAnswer || q.correctAnswer < 1 || q.correctAnswer > 4) {
        throw new Error(`Invalid 'ans' in question ${idx + 1}`);
      }
      
      return {
        question: q.question,
        option1: q.option1,
        option2: q.option2,
        option3: q.option3,
        option4: q.option4,
        correctAnswer: `option${q.correctAnswer}`,
      };
    });
      console.log(formattedQuestions,"rf3f4f4f4f4f54r5454")
    

    // Save quiz
    const quiz = await quizModel.create({
      title: quizData.title,
      questions: formattedQuestions,
    });

    res.status(201).json({ success: true, message: "Quiz created successfully", data: quiz });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create quiz", error: err.message });
  }
};

