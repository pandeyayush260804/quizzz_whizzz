import { z } from "zod";

export const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  option1: z.string().min(1, "Option 1 is required"),
  option2: z.string().min(1, "Option 2 is required"),
  option3: z.string().min(1, "Option 3 is required"),
  option4: z.string().min(1, "Option 4 is required"),
  ans: z.number().min(1, "Answer must be between 1 and 4").max(4, "Answer must be between 1 and 4"),

});

export type QuestionSchema = z.infer<typeof questionSchema>;
