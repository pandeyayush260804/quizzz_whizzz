
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registerSchema } from "../validations/register-validation.js";
// import { doRegister } from "../api/user-api";
// import { useNavigate } from "react-router-dom";
// import {
//   Alert,
//   AlertDescription,
//   AlertTitle,
// } from "@/components/ui/alert";
// import { Angry } from "lucide-react";
// import { useState } from "react";

// const Register = () => {
//   const [status, setStatus] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       name: "",
//     },
//   });

//   const alertJSX = (
//     <div>
//       <Alert variant="destructive">
//         <Angry />
//         <AlertTitle>Register Message</AlertTitle>
//         <AlertDescription>{message}</AlertDescription>
//       </Alert>
//     </div>
//   );

//   const registerSubmit = async (userData: any) => {
//     console.log("Form Submit ", userData);
//     try {
//       const result = await doRegister(userData);
//       console.log("Result ", result);
//       if (result.data.message) {
//         setStatus(false);
//         navigate("/login");
//       } else {
//         setStatus(true);
//         setMessage("Unable to register...");
//         console.log("Unable to register...");
//       }
//     } catch (err: any) {
//       setStatus(true);
//       setMessage(
//         err.response?.data?.message || "Registration failed."
//       );
//       console.log("Register Fail ", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-400 to-blue-200 flex items-center justify-center p-4 relative">
//       {/* 🔴 Blurred Error Popup Card with Alert */}
//       {status && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
//           <Card className="bg-red-100 border-red-400 text-red-700 w-full max-w-md shadow-xl">
//             <CardHeader>
//               <CardTitle className="text-center text-lg">
//                 Registration Failed
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               {alertJSX}
//               <div className="flex justify-between mt-4">
//                 <Button
//                   variant="outline"
//                   onClick={() => setStatus(false)}
//                   className="text-red-600 border-red-400 hover:bg-red-200"
//                 >
//                   Close
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   className="text-blue-600 hover:underline"
//                   onClick={() => {
//                     setStatus(false);
//                     navigate("/login");
//                   }}
//                 >
//                   Go to Login
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* 🟢 Main Register Form */}
//       <Card className="w-full max-w-md mx-auto">
//         <CardHeader>
//           <CardTitle className="space-y-1 text-center">
//             Register Here
//           </CardTitle>
//           <CardDescription className="text-center">
//             Quiz App Form
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit(registerSubmit)}>
//             <div className="grid w-full max-w-sm items-center gap-3">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 {...register("email")}
//                 type="email"
//                 id="email"
//                 placeholder="Email"
//               />
//               <span className="text-red-500">
//                 {errors.email && errors.email.message}
//               </span>
//             </div>

//             <div className="grid w-full max-w-sm items-center gap-3 mt-4">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 {...register("password")}
//                 type="password"
//                 id="password"
//                 placeholder="Password"
//               />
//               <span className="text-red-500">
//                 {errors.password && errors.password.message}
//               </span>
//             </div>

//             <div className="grid w-full max-w-sm items-center gap-3 mt-4">
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 {...register("name")}
//                 type="text"
//                 id="name"
//                 placeholder="Name"
//               />
//               <span className="text-red-500">
//                 {errors.name && errors.name.message}
//               </span>
//             </div>

//             <div className="grid w-full max-w-sm items-center gap-3 mt-6">
//               <Button type="submit">Register</Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>

      
//     </div>
//   );
// };

// export default Register;
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validations/register-validation.js";
import { doRegister } from "../api/user-api";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Angry } from "lucide-react";
import { useState } from "react";

const Register = () => {
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const alertJSX = (
    <div>
      <Alert variant="destructive">
        <Angry />
        <AlertTitle>Register Message</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );

  const registerSubmit = async (userData: any) => {
    console.log("Form Submit ", userData);
    try {
      const result = await doRegister(userData);
      console.log("Result ", result);
      if (result.data.message) {
        setStatus(false);
        navigate("/login");
      } else {
        setStatus(true);
        setMessage("Unable to register...");
        console.log("Unable to register...");
      }
    } catch (err: any) {
      setStatus(true);
      setMessage(
        err.response?.data?.message || "Registration failed."
      );
      console.log("Register Fail ", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative">
      {/* 🔴 Blurred Error Popup Card with Alert */}
      {status && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <Card className="bg-red-100 border-red-400 text-red-700 w-full max-w-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-lg">
                Registration Failed
              </CardTitle>
            </CardHeader>
            <CardContent>
              {alertJSX}
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  onClick={() => setStatus(false)}
                  className="text-red-600 border-red-400 hover:bg-red-200"
                >
                  Close
                </Button>
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    setStatus(false);
                    navigate("/login");
                  }}
                >
                  Go to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 🟢 Main Register Form */}
      <Card className="w-full max-w-md mx-auto shadow-lg border bg-white/90">
        <CardHeader>
          <CardTitle className="space-y-1 text-center">
            Register Here
          </CardTitle>
          <CardDescription className="text-center">
            Quiz App Form
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(registerSubmit)}>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Email"
              />
              <span className="text-red-500">
                {errors.email && errors.email.message}
              </span>
            </div>

            <div className="grid w-full max-w-sm items-center gap-3 mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                type="password"
                id="password"
                placeholder="Password"
              />
              <span className="text-red-500">
                {errors.password && errors.password.message}
              </span>
            </div>

            <div className="grid w-full max-w-sm items-center gap-3 mt-4">
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name")}
                type="text"
                id="name"
                placeholder="Name"
              />
              <span className="text-red-500">
                {errors.name && errors.name.message}
              </span>
            </div>

            <div className="grid w-full max-w-sm items-center gap-3 mt-6">
              <Button type="submit">Register</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
