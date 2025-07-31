
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import UserList from "@/modules/quiz/pages/user-list.tsx";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-6 sm:p-10 text-white">
      <h1 className="text-4xl font-bold mb-10 text-center drop-shadow-lg">Choose a Quiz</h1>

      <div className="grid grid-rows-1  gap-8 max-w-6xl mx-auto">
        {/* Create Quiz */}
        <Card className="bg-white text-black shadow-2xl rounded-3xl transition transform hover:scale-[1.01]">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Create A Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-gray-700">Build custom quizzes, your way</p>
            <Button 
              onClick={() => navigate("/create-quiz")} 
              className="bg-black hover:bg-gray-800 text-white w-full py-3 text-lg rounded-xl"
            >
              Create
            </Button>
          </CardContent>
        </Card>

        {/* All Quizzes */}
        <Card className="bg-white text-black shadow-2xl rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">All Quizzes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* GK Quiz Card */}
            <Card className="bg-gray-50 text-black shadow-md rounded-xl hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Sample Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">Test your knowledge with friends or solo</p>
                <Button 
                  onClick={() => navigate("/join-quiz")} 
                  className="bg-black hover:bg-gray-800 text-white w-full py-2 rounded-md"
                >
                  Join
                </Button>
              </CardContent>
            </Card>

            {/* Dynamic Quiz List */}
            <UserList />
          </CardContent>
        </Card>
        
      </div>
      <div className="mt-12 text-center">
        <Button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-lg shadow-md"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
