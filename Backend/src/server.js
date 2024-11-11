import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "../src/routes/userRoutes.js";

// Initialize dotenv for environment variables
dotenv.config();

// Create an Express app
const app = express();

// Adjust the port to match your frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Use cookie-parser with a secret key for signed cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database (e.g., MongoDB)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log("Database connection error:", err));

// Use user routes for API endpoints
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
