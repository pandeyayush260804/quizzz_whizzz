// import { Route, Routes } from "react-router-dom";
// import Login from "@/modules/user/pages/login";
// import Register from "@/modules/user/pages/register";
// import Home from "@/modules/user/pages/home";
// import NotFound from "@/modules/user/pages/not-found";
// import Dashboard from "@/modules/user/pages/dashboard";
// import CreateQuiz from "@/modules/quiz/pages/create-quiz";
// import AddQuestion from "@/modules/quiz/pages/add-question";
// import Quiz from "@/modules/user/pages/quiz1";
// import UserList from "@/modules/quiz/pages/user-list";


// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/create-quiz" element={<CreateQuiz />} />
//       <Route path="/join-quiz" element={<Quiz />} />
//       <Route path="/add-question" element={<AddQuestion />} />
//       <Route path="*" element={<NotFound />} />
//       <Route path="/quiz-list" element={<UserList />} />
//       <Route path="/join-quiz/:id" element={<JoinQuiz />} />
//     </Routes>
//   );
// };

// export default AppRoutes;
import { Route, Routes } from "react-router-dom";
import Login from "@/modules/user/pages/login";
import Register from "@/modules/user/pages/register";
import Home from "@/modules/user/pages/home";
import NotFound from "@/modules/user/pages/not-found";
import Dashboard from "@/modules/user/pages/dashboard";
import CreateQuiz from "@/modules/quiz/pages/create-quiz";
import AddQuestion from "@/modules/quiz/pages/add-question";
import Quiz from "@/modules/user/pages/quiz1";
import UserList from "@/modules/quiz/pages/user-list"; // ✅ You have this
import AttemptQuiz from "@/modules/quiz/pages/attempt-quiz";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/join-quiz" element={<Quiz />} /> {/* If 'quiz1.tsx' is for joining */}
      <Route path="/add-question" element={<AddQuestion />} />
      <Route path="/quiz-list" element={<UserList />} /> {/* ✅ You have this */}
      <Route path="*" element={<NotFound />} />
      <Route path="/join-quiz/:id" element={<AttemptQuiz />} />
    </Routes>
  );
};

export default AppRoutes;

