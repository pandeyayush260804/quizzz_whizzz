// import { verifyToken } from "../services/token.js";

// export const auth = (req, res, next) => {
//   const token = req.headers["authorization"];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: Token missing" });
//   }

//   try {
//     const email = verifyToken(token);
//     req.email = email; // Optional: attach email to request object
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

import { verifyToken } from "../services/token.js";

export const auth = (req, res, next) => {
  // Example: "Bearer <token>"
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1]; // Extract actual token

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // You can access decoded payload (like email or userId) in next middleware/controller
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};