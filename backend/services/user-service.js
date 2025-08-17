import { userModel } from "../model/user-model.js";
import { compareHash, encryptPassword } from "../util/services/password-hash.js";
import { generateToken } from "../util/services/token.js";

// ✅ Register Service
export const register = async (userObject) => {
  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email: userObject.email }).exec();
    if (existingUser) {
      throw new Error("User already exists.");
    }

    // Encrypt password before saving
    userObject.password = await encryptPassword(userObject.password);

    const doc = await userModel.create(userObject);

    if (!doc || !doc._id) {
      throw new Error("User registration failed.");
    }

    return "User registered successfully.";
  } catch (err) {
    throw new Error("Registration failed: " + err.message);
  }
};

// ✅ Login Service
export const login = async (userObject) => {
  try {
    const doc = await userModel.findOne({ email: userObject.email }).exec();

    if (!doc) {
      return { message: "Invalid email or password" };
    }

    // Compare passwords
    const isPasswordMatch = await compareHash(userObject.password, doc.password);
    if (!isPasswordMatch) {
      return { message: "Invalid email or password" };
    }

    // Generate JWT token with payload
    const token = generateToken({
      userId: doc._id,
      email: doc.email,
      role: doc.role
    });

    return {
      message: `Welcome ${doc.username || doc.name}`, // ✅ safer fallback
      role: doc.role,
      token: token,
    };
  } catch (err) {
    throw new Error("Login failed: " + err.message);
  }
};
