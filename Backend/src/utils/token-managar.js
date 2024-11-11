import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

// Function to create a JWT token with the given payload and expiration
export const createToken = (id, email, expiresIn) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

// Middleware to verify the JWT token
export const verifyToken = async (req, res, next) => {
  const token = req.signedCookies[COOKIE_NAME];

  // Log the token for debugging purposes
  console.log("Token received:", token);

  if (!token || token.trim() === "") {
    console.error("Token not received");
    res.status(401).json({ message: "Token Not Received" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.error("Token verification failed:", err);
      res.status(401).json({ message: "Token Expired or Invalid" });
      return;
    }

    // Log the decoded token data for debugging purposes
    console.log("Decoded token data:", decodedToken);

    // Store decoded token data in `res.locals` to make it available in later middleware/handlers
    res.locals.jwtData = decodedToken;
    next();
  });
};
