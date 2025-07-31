import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "./data1";

export const Quiz: React.FC = () => {
  const navigate = useNavigate(); // 👈 Add this
  const [index, setIndex] = useState<number>(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [result, setResult] = useState<boolean>(false);

  const Option1 = useRef<HTMLLIElement>(null);
  const Option2 = useRef<HTMLLIElement>(null);
  const Option3 = useRef<HTMLLIElement>(null);
  const Option4 = useRef<HTMLLIElement>(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    ans: number
  ) => {
    if (!lock) {
      if (question.ans === ans) {
        e.currentTarget.classList.add("bg-green-100", "border-green-500");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.currentTarget.classList.add("bg-red-100", "border-red-500");
        setLock(true);
        option_array[question.ans - 1].current?.classList.add(
          "bg-green-100",
          "border-green-500"
        );
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      const newIndex = index + 1;
      setIndex(newIndex);
      setQuestion(data[newIndex]);
      setLock(false);
      option_array.forEach((option) => {
        option.current?.classList.remove(
          "bg-green-100",
          "border-green-500",
          "bg-red-100",
          "border-red-500"
        );
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-36 bg-white text-gray-900 flex flex-col gap-6 rounded-xl p-10 shadow-lg">
      <h1 className="text-3xl font-bold text-center">Quiz App</h1>
      <hr className="text-xl font-medium" />
      {!result ? (
        <>
          <h2 className="text-xl font-medium">
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={Option1}
              onClick={(e) => checkAns(e, 1)}
              className="flex items-center h-16 px-4 mb-5 border border-gray-500 rounded-lg text-lg cursor-pointer hover:bg-gray-100"
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e) => checkAns(e, 2)}
              className="flex items-center h-16 px-4 mb-5 border border-gray-500 rounded-lg text-lg cursor-pointer hover:bg-gray-100"
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(e) => checkAns(e, 3)}
              className="flex items-center h-16 px-4 mb-5 border border-gray-500 rounded-lg text-lg cursor-pointer hover:bg-gray-100"
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(e) => checkAns(e, 4)}
              className="flex items-center h-16 px-4 mb-5 border border-gray-500 rounded-lg text-lg cursor-pointer hover:bg-gray-100"
            >
              {question.option4}
            </li>
          </ul>
          <button
            onClick={next}
            className="mx-auto w-64 h-16 bg-indigo-700 text-white text-xl font-semibold rounded-lg hover:bg-indigo-800 transition"
          >
            Next
          </button>
          <div className="text-center text-base mt-2">
            {index + 1} of {data.length} questions
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl text-center">
            You Scored <span className="font-semibold">{score}</span> out of{" "}
            {data.length}
          </h2>

          <button
            onClick={reset}
            className="mx-auto w-64 h-16 bg-indigo-700 text-white text-xl font-semibold rounded-lg hover:bg-indigo-800 transition mb-4"
          >
            Reset
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="mx-auto w-64 h-16 bg-gray-700 text-white text-xl font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Go to Dashboard
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;



