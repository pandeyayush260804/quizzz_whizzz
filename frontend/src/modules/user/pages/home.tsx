import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[url('https://img.freepik.com/free-psd/3d-rendering-questions-background_23-2151455640.jpg')] bg-cover bg-center h-64 w-full flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        <div className="flex flex-col justify-center items-center p-10 bg-white">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Welcome to <br /> Quizzz Whizzz
          </h1>
          <p className="text-gray-700 text-center mb-6">
            Your ultimate destination to test and grow your knowledge.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg font-semibold transition duration-300"
          >
            Continue
          </button>
        </div>

        {/* Right Side: Side Banner Image */}
        <div className="hidden md:block">
          <img
            src="https://play-lh.googleusercontent.com/huqpAfeW-vIrwJu9kXxkymHGt039mkT0q7wo1vD7OZZXyl_T0da82mpPByol07OkMpMh"
            alt="Quiz Poster"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
