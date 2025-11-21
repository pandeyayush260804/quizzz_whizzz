
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

interface User {
  _id: string;
  title: string;
  questions: Question[];
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:7777/api/v1/quiz/quiz")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Quizzes:", data);
        setUsers(data);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <div className="space-y-6">
      {users.map((user) => (
        <Card
          key={user._id}
          className="bg-gray-50 text-black shadow-md rounded-xl hover:shadow-lg transition"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{user.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">Test your knowledge with friends or solo</p>
            <Button
              onClick={() => navigate(`/join-quiz/${user._id}`)}
              className="bg-black hover:bg-gray-800 text-white w-full py-2 rounded-md"
            >
              Join
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
