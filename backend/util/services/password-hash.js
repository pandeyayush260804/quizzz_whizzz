import bcrypt from 'bcrypt';

/**
 * Hashes the given plain text password.
 * @param {string} plainPassword
 * @returns {string} hashed password
 */
export const encryptPassword = (plainPassword) => {
    const saltRounds = parseInt(process.env.SALT || '10', 10); // fallback to 10
    if (isNaN(saltRounds)) {
        throw new Error("Invalid SALT environment variable");
    }
    return bcrypt.hashSync(plainPassword, saltRounds);
};

/**
 * Compares a plain password with a hashed password.
 * @param {string} plainPassword
 * @param {string} dbPassword
 * @returns {boolean}
 */
export const compareHash = (plainPassword, dbPassword) => {
    return bcrypt.compareSync(plainPassword, dbPassword);
};
