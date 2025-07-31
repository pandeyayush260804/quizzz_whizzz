// import { userModel } from "../model/user-model.js";
// import { compareHash, encryptPassword } from "../util/services/password-hash.js"; // ✅ fixed typo in file name
// import { generateToken } from "../util/services/token.js";

// export const register = async (userObject) => {
//   try {
//     // Encrypt password before saving
//     userObject.password = encryptPassword(userObject.password);
//     const doc = await userModel.create(userObject);

//     if (doc && doc._id) {
//       return "User registered successfully.";
//     } else {
//       throw new Error("User registration failed.");
//     }
//   } catch (err) {
//     throw err;
//   }
// };

// export const login = async (userObject) => {
//   try {
//     const doc = await userModel.findOne({ email: userObject.email }).exec();

//     if (doc && compareHash(userObject.password, doc.password)) {
//       const token = generateToken(doc.email); // ⚠️ You may want to also store/send token
//       return {
//         message: "Welcome " + doc.name,
//         role: doc.role,
//         token: token
//       };
//     } else {
//       return { message: "Invalid email or password" };
//     }
//   } catch (err) {
//     throw new Error("Login failed: " + err.message);
//   }
// };

import { userModel } from "../model/user-model.js";
import { compareHash, encryptPassword } from "../util/services/password-hash.js";
import { generateToken } from "../util/services/token.js";

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

    if (doc && doc._id) {
      return "User registered successfully.";
    } else {
      throw new Error("User registration failed.");
    }
  } catch (err) {
    throw new Error("Registration failed: " + err.message);
  }
};

export const login = async (userObject) => {
  try {
    const doc = await userModel.findOne({ email: userObject.email }).exec();

    if (!doc) {
      return { message: "Invalid email or password" };
    }

    const isPasswordMatch = await compareHash(userObject.password, doc.password);
    if (!isPasswordMatch) {
      return { message: "Invalid email or password" };
    }

    const token = generateToken({ userId: doc._id, email: doc.email, role: doc.role });

    return {
      message: "Welcome " + doc.username,
      role: doc.role,
      token: token
    };
  } catch (err) {
    throw new Error("Login failed: " + err.message);
  }
};