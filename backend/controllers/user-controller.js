import { register as registerUser, login as loginUser } from "../services/user-service.js";

export const login = async (req, res) => {
  const userObject = req.body;
  try {
    const obj = await loginUser(userObject);
    console.log("Login Request:", req.body);
    res.status(200).json({
      success: true,
      ...obj
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(400).json({
      success: false,
      message: err.message || "Login failed."
    });
  }
};

export const register = async (req, res) => {
  const userObject = req.body;
  try {
    const message = await registerUser(userObject);
    console.log("Register Request:", req.body);
    res.status(201).json({
      success: true,
      message
    });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(400).json({
      success: false,
      message: err.message || "Registration failed."
    });
  }
};

export const profile = (req, res) => {
  res.json({
    success: true,
    message: "Profile route"
  });
};
