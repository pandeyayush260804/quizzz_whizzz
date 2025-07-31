import { Route, Routes } from "react-router-dom";
import Login from "@/modules/user/pages/login";
import Register from "@/modules/user/pages/register";
import Home from "@/modules/user/pages/home";
import NotFound from "@/modules/user/pages/not-found";
import Dashboard from "@/modules/user/pages/dashboard";
import CreateQuiz from "@/modules/quiz/pages/create-quiz";
import AddQuestion from "@/modules/quiz/pages/add-question";
import Quiz from "@/modules/user/pages/quiz1";
import UserList from "@/modules/quiz/pages/user-list";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/join-quiz" element={<Quiz />} />
      <Route path="/add-question" element={<AddQuestion />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/quiz-list" element={<UserList />} />
    </Routes>
  );
};

export default AppRoutes;
