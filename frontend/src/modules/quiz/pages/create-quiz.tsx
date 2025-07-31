import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { quizSchema, type QuizSchema } from "../../user/validations/quiz-validation";
import { useNavigate } from "react-router-dom";

type OptionKey = "option1" | "option2" | "option3" | "option4";
const optionKeys: OptionKey[] = ["option1", "option2", "option3", "option4"];

export default function CreateQuiz() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuizSchema>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      questions: [
        {
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          ans: 1,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data: QuizSchema) => {
  setLoading(true);

  const quizPayload = {
    title: data.title,
    questions: data.questions.map((q) => ({
      question: q.question,
      option1: q.option1,
      option2: q.option2,
      option3: q.option3,
      option4: q.option4,
      correctAnswer: q.ans  // Converts ans (1-4) to option1, option2, etc.
    })),
  };

  try {
    const response = await axios.post("http://localhost:7777/api/v1/quiz/quiz", quizPayload);
    console.log("Quiz created:", response.data);
    alert("Quiz created successfully!");
  } catch (error) {
    console.error("Error creating quiz:", error);
    alert("Failed to create quiz.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Card className="max-w-4xl mx-auto mt-10 p-6">
      <CardHeader>
        <CardTitle className="text-2xl">Create Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Quiz Title */}
          <div>
            <Label htmlFor="title">Quiz Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Questions Section */}
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border p-4 rounded-lg bg-gray-50 space-y-4"
            >
              {/* Question Text */}
              <div>
                <Label>Question {index + 1}</Label>
                <Input {...register(`questions.${index}.question`)} />
                {errors.questions?.[index]?.question && (
                  <p className="text-red-500 text-sm">
                    {errors.questions[index].question?.message}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4">
                {optionKeys.map((opt, i) => (
                  <div key={opt}>
                    <Label>{`Option ${i + 1}`}</Label>
                    <Input {...register(`questions.${index}.${opt}`)} />
                    {errors.questions?.[index]?.[opt] && (
                      <p className="text-red-500 text-sm">
                        {errors.questions[index]?.[opt]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Answer */}
              <div>
                <Label>Correct Answer (1-4)</Label>
                <Input
                  type="number"
                  min={1}
                  max={4}
                  {...register(`questions.${index}.ans`, {
                    valueAsNumber: true,
                  })}
                />
                {errors.questions?.[index]?.ans && (
                  <p className="text-red-500 text-sm">
                    {errors.questions[index].ans?.message}
                  </p>
                )}
              </div>

              {/* Remove Button */}
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Remove Question
              </Button>
            </div>
          ))}

          {/* Add Question */}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              append({
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                ans: 1,
              })
            }
          >
            Add Question
          </Button>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Quiz"}
          </Button>
        </form>
      </CardContent>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </Button>

    </Card>
  );
}
