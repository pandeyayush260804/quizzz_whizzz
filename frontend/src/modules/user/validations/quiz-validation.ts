import { z } from "zod";

// Define questionSchema
export const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  option1: z.string().min(1, "Option 1 is required"),
  option2: z.string().min(1, "Option 2 is required"),
  option3: z.string().min(1, "Option 3 is required"),
  option4: z.string().min(1, "Option 4 is required"),
  ans: z.number().min(1, "Answer must be between 1 and 4").max(4, "Answer must be between 1 and 4"),
});

// Define quizSchema using questionSchema
export const quizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  questions: z.array(questionSchema).min(1, "At least one question is required"),
});

// Export inferred type
export type QuizSchema = z.infer<typeof quizSchema>;