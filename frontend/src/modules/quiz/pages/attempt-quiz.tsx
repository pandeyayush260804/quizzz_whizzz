// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface Question {
//   question: string;
//   option1: string;
//   option2: string;
//   option3: string;
//   option4: string;
// }

// interface Quiz {
//   _id: string;
//   title: string;
//   questions: Question[];
// }

// const AttemptQuiz = () => {
//   const { id } = useParams<{ id: string }>();
//   const [quiz, setQuiz] = useState<Quiz | null>(null);

//   useEffect(() => {
//     fetch(`http://localhost:7777/api/v1/quiz/quiz/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setQuiz(data);
//       })
//       .catch((err) => console.error("Quiz fetch error:", err));
//   }, [id]);

//   if (!quiz) return <p className="text-center mt-10">Loading quiz...</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold text-center">{quiz.title}</h1>
//       {quiz.questions.map((q, idx) => (
//         <Card key={idx} className="bg-white text-black">
//           <CardHeader>
//             <CardTitle>
//               {idx + 1}. {q.question}
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <div>{q.option1}</div>
//             <div>{q.option2}</div>
//             <div>{q.option3}</div>
//             <div>{q.option4}</div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default AttemptQuiz;
import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Question {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: "option1" | "option2" | "option3" | "option4";
}

interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
}

const optionIndexMap = {
  option1: 1,
  option2: 2,
  option3: 3,
  option4: 4,
} as const;

const AttemptQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef<HTMLDivElement>(null);
  const Option2 = useRef<HTMLDivElement>(null);
  const Option3 = useRef<HTMLDivElement>(null);
  const Option4 = useRef<HTMLDivElement>(null);

  const options = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    fetch(`http://localhost:7777/api/v1/quiz/quiz/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
      })
      .catch((err) => console.error("Quiz fetch error:", err));
  }, [id]);

  if (!quiz) return <p className="text-center mt-10">Loading quiz...</p>;

  const question = quiz.questions[index];

  const checkAns = (
    e: React.MouseEvent<HTMLDivElement>,
    selectedIndex: number
  ) => {
    if (lock) return;

    const correctIndex = optionIndexMap[question.correctAnswer];

    if (correctIndex === selectedIndex) {
      e.currentTarget.classList.add("bg-green-100", "border-green-500");
      setScore((prev) => prev + 1);
    } else {
      e.currentTarget.classList.add("bg-red-100", "border-red-500");
      options[correctIndex - 1].current?.classList.add(
        "bg-green-100",
        "border-green-500"
      );
    }

    setLock(true);
  };

  const next = () => {
    if (!lock) return;

    if (index === quiz.questions.length - 1) {
      setResult(true);
      return;
    }

    setIndex((prev) => prev + 1);
    setLock(false);

    // Remove colors
    options.forEach((opt) => {
      opt.current?.classList.remove(
        "bg-green-100",
        "border-green-500",
        "bg-red-100",
        "border-red-500"
      );
    });
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);

    options.forEach((opt) => {
      opt.current?.classList.remove(
        "bg-green-100",
        "border-green-500",
        "bg-red-100",
        "border-red-500"
      );
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">{quiz.title}</h1>

      {!result ? (
        <>
          <Card className="bg-white text-black">
            <CardHeader>
              <CardTitle>
                {index + 1}. {question.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div
                ref={Option1}
                onClick={(e) => checkAns(e, 1)}
                className="p-3 border rounded cursor-pointer hover:bg-gray-100"
              >
                {question.option1}
              </div>

              <div
                ref={Option2}
                onClick={(e) => checkAns(e, 2)}
                className="p-3 border rounded cursor-pointer hover:bg-gray-100"
              >
                {question.option2}
              </div>

              <div
                ref={Option3}
                onClick={(e) => checkAns(e, 3)}
                className="p-3 border rounded cursor-pointer hover:bg-gray-100"
              >
                {question.option3}
              </div>

              <div
                ref={Option4}
                onClick={(e) => checkAns(e, 4)}
                className="p-3 border rounded cursor-pointer hover:bg-gray-100"
              >
                {question.option4}
              </div>

              <button
                onClick={next}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg mt-4"
              >
                Next
              </button>

              <p className="text-center text-sm mt-2">
                {index + 1} of {quiz.questions.length} questions
              </p>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">
            You scored {score} out of {quiz.questions.length}
          </h2>

          <button
            onClick={reset}
            className="w-48 py-3 bg-indigo-600 text-white rounded-lg"
          >
            Restart Quiz
          </button>
          <br></br>
          <button
              className="w-48 py-3 bg-indigo-600 text-white rounded-lg"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>

          
        </div>
      )}
    </div>
  );
};

export default AttemptQuiz;
