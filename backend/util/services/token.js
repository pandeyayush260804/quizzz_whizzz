import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'UCANTSEEME'; // fallback, but env preferred

/**
 * Generates a JWT token with the user's email.
 * @param {string} email
 * @returns {string} JWT token
 */
export const generateToken = (email) => {
    return jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
};

/**
 * Verifies a JWT token and returns the email if valid.
 * @param {string} token
 * @returns {string} email
 * @throws {Error} if token is invalid or expired
 */
export const verifyToken = (token) => {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded.email;
};
