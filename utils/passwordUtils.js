const bcrypt = require('bcrypt');

// Hashing a password
const hashPassword = async (password) => {
  try {
    // Generate a salt for hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Return the hashed password
    return hashedPassword;
  } catch (error) {
    throw new Error('Failed to hash password');
  }
};

// Comparing a password with a hashed password
const comparePassword = async (password, hashedPassword) => {
  try {
    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);

    // Return whether the passwords match or not
    return isMatch;
  } catch (error) {
    throw new Error('Failed to compare passwords');
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
