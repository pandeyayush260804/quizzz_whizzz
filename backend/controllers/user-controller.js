import { register as registerUser, login as loginUser } from "../services/user-service.js";

export const login = async (req, res) => {
  const userObject = req.body;
  try {
    const obj = await loginUser(userObject);
    console.log("Desc Rec:",req.body)
    res.status(200).json(obj);
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Login failed, server error.' });
  }
};

export const register = async (req, res) => {
  const userObject = req.body;
  try {
    const message = await registerUser(userObject);
    console.log("Desc Rec:",req.body)
    res.status(200).json({ message });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Registration failed, server error.' });
  }
};

export const profile = (req, res) => {
  res.json({ message: 'Profile route' });
};
