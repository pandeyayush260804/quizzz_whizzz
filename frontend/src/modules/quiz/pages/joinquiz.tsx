import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const JoinQuiz = () => {
  const { id } = useParams(); // quiz id from route
  const [quiz, setQuiz] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:7777/api/v1/quiz/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
      })
      .catch((err) => console.error("Error fetching quiz:", err));
  }, [id]);

  if (!quiz) return <p className="text-center mt-10">Loading quiz...</p>;

  const question = quiz.questions[currentIndex];

  const handleAnswerClick = (optionKey: string) => {
    setSelectedAnswer(optionKey);

    // ✅ increase score only if correct
    if (optionKey === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null); // reset for next Q
    } else {
      setIsFinished(true); // quiz completed
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-[90%] max-w-lg p-6">
        {!isFinished ? (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                {quiz.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-lg font-semibold mb-4">
                {currentIndex + 1}. {question.question}
              </h2>
              <div className="space-y-3">
                {["option1", "option2", "option3", "option4"].map((opt) => {
                  // ✅ logic for highlighting
                  let highlight = "";
                  if (selectedAnswer) {
                    if (opt === question.correctAnswer) {
                      highlight = "bg-green-200 border-green-500"; // correct always green
                    } else if (opt === selectedAnswer) {
                      highlight = "bg-red-200 border-red-500"; // wrong selection red
                    }
                  }

                  return (
                    <Button
                      key={opt}
                      variant="outline"
                      className={`w-full py-3 text-left justify-start ${highlight}`}
                      onClick={() => handleAnswerClick(opt)}
                      disabled={selectedAnswer !== null} // lock after choosing
                    >
                      {question[opt]}
                    </Button>
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-500">
                  {currentIndex + 1} of {quiz.questions.length} questions
                </p>
                {selectedAnswer && (
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 text-white"
                  >
                    {currentIndex + 1 === quiz.questions.length
                      ? "Finish"
                      : "Next"}
                  </Button>
                )}
              </div>
            </CardContent>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed 🎉</h2>
            <p className="text-lg">
              Your Score: {score} / {quiz.questions.length}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default JoinQuiz;
