import axios from 'axios';
import type { RegisterSchema } from "../validations/register-validation";
import type { LoginSchema } from "../validations/login-validation";

// Set the base URL globally for axios
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://quizzz-whizzz.vercel.app/api/v1";
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers["Content-Type"] = "application/json";

// Debug log to confirm URL
console.log("API_BASE_URL is:", API_BASE_URL);

// Register API call
export const doRegister = (userData: RegisterSchema) => {
  console.log("Registering user with:", userData);
  return axios.post("/user/register", userData);
};

// Login API call
export const doLogin = (userData: LoginSchema) => {
  console.log("Logging in user with:", userData);
  return axios.post("/user/login", userData);
};
