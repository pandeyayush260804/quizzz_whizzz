
// import { useState } from "react";
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
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema } from "../validations/login-validation";
// import type { LoginSchema } from "../validations/login-validation";
// import { doLogin } from "../api/user-api.ts";

// const Login = () => {
//   const navigate = useNavigate();
//   const [loginError, setLoginError] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const loginSubmit = async (userData: LoginSchema) => {
//     console.log("Form Submitted", userData);
//     try {
//       const result = await doLogin(userData);
//       console.log("Login success", result);

//       const token = result?.data?.token;
//       if (token) {
//         localStorage.setItem("token", token);
//         navigate("/dashboard");
//       } else {
//         setLoginError(true);
//       }
//     } catch (err: any) {
//       console.error("Login failed", err);
//       setLoginError(true);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-400 to-blue-200 flex items-center justify-center p-4 relative">
//       {/* 🔴 Error Popup with Blurred Background */}
//       {loginError && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
//           <Card className="bg-red-100 border-red-400 text-red-700 w-full max-w-md shadow-xl">
//             <CardHeader>
//               <CardTitle className="text-center text-lg">Login Failed</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-center">Invalid email or password. Please try again.</p>
//               <div className="flex justify-center mt-4">
//                 <Button
//                   variant="outline"
//                   onClick={() => setLoginError(false)}
//                   className="text-red-600 border-red-400 hover:bg-red-200"
//                 >
//                   Close
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* 🟢 Main Login Card */}
//       <Card className="w-full max-w-md mx-auto shadow-md border">
//         <CardHeader>
//           <CardTitle className="text-center text-xl font-bold">Login</CardTitle>
//           <CardDescription className="text-center">
//             Login to start your quiz journey!
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit(loginSubmit)} className="space-y-4">
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 {...register("email")}
//                 type="email"
//                 id="email"
//                 placeholder="Enter your email"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email.message}</p>
//               )}
//             </div>

//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 {...register("password")}
//                 type="password"
//                 id="password"
//                 placeholder="Enter your password"
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm">{errors.password.message}</p>
//               )}
//             </div>

//             <Button type="submit" className="w-full">
//               Login
//             </Button>
//           </form>

//           <div className="mt-4 text-center">
//             <p className="text-sm">
//               Don’t have an account?{" "}
//               <Link to="/register">
//                 <Button
//                   variant="link"
//                   className="text-blue-600 hover:underline px-1"
//                 >
//                   Register
//                 </Button>
//               </Link>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/login-validation";
import type { LoginSchema } from "../validations/login-validation";
import { doLogin } from "../api/user-api.ts";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginSubmit = async (userData: LoginSchema) => {
    console.log("Form Submitted", userData);
    try {
      const result = await doLogin(userData);
      console.log("Login success", result);

      const token = result?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        setLoginError(true);
      }
    } catch (err: any) {
      console.error("Login failed", err);
      setLoginError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center p-4 relative">
      {/* 🔴 Error Popup with Blurred Background */}
      {loginError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <Card className="bg-red-100 border-red-400 text-red-700 w-full max-w-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-lg">Login Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">Invalid email or password. Please try again.</p>
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => setLoginError(false)}
                  className="text-red-600 border-red-400 hover:bg-red-200"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 🟢 Main Login Card */}
      <Card className="w-full max-w-md mx-auto shadow-lg border bg-white/90">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">Login</CardTitle>
          <CardDescription className="text-center">
            Login to start your quiz journey!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(loginSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                type="password"
                id="password"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Don’t have an account?{" "}
              <Link to="/register">
                <Button
                  variant="link"
                  className="text-blue-600 hover:underline px-1"
                >
                  Register
                </Button>
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
