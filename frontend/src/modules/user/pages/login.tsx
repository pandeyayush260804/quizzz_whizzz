import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

      // Safely access token
      const token = result?.data?.token;
      if (token) {
        localStorage.setItem("token", token); // ✅ Save token properly
        navigate("/dashboard");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Login failed", err);
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-md border">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">Login</CardTitle>
        <CardDescription className="text-center">Login to start your quiz journey!</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(loginSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input {...register("email")} type="email" id="email" placeholder="Enter your email" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input {...register("password")} type="password" id="password" placeholder="Enter your password" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full">Login</Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don’t have an account?{" "}
            <Link to="/register">
              <Button variant="link" className="text-blue-600 hover:underline px-1">Register</Button>
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
