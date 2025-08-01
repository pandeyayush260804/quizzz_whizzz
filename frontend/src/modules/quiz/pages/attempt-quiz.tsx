import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Question {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
}

const AttemptQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    fetch(`http://localhost:7777/api/v1/quiz/quiz/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
      })
      .catch((err) => console.error("Quiz fetch error:", err));
  }, [id]);

  if (!quiz) return <p className="text-center mt-10">Loading quiz...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">{quiz.title}</h1>
      {quiz.questions.map((q, idx) => (
        <Card key={idx} className="bg-white text-black">
          <CardHeader>
            <CardTitle>
              {idx + 1}. {q.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>{q.option1}</div>
            <div>{q.option2}</div>
            <div>{q.option3}</div>
            <div>{q.option4}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AttemptQuiz;
