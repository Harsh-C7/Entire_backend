import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Missing authentication token' });
    }

    // Extract the token value from the Authorization header
    const [tokenType, token] = authorizationHeader.split(' ');

    if (tokenType !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }

    // Verify the token
    const decoded = jwt.verify(token, 'your_secret_key');

    // Attach the user ID to the request object for further use
    req.user = { userId: decoded.userId };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired authentication token' });
  }
};

module.exports = { authenticateUser };
