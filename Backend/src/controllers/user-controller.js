import { compare, hash } from "bcrypt";
import { sendApprovalEmail } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { createToken } from "../utils/token-managar.js";

// User signup handler
export const userSignup = async (req, res, next) => {
  try {
    const { name, email, password, role = "user" } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).send("User already registered");
      return;
    }

    const hashedPassword = await hash(password, 10);

    const isApproved = role === "admin" ? false : true; // Admin needs approval
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      isApproved,
    });

    await user.save();

    // Send approval email if role is 'admin' and approval is required
    if (role === "admin" && !isApproved) {
      await sendApprovalEmail({ name, email });
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    res.status(201).json({
      message: "OK",
      name: user.name,
      email: user.email,
      role: user.role,
      isApproved: user.isApproved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// User login handler
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).send("User not registered");
      return;
    }

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(403).send("Incorrect Password");
      return;
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// Verify user handler
export const verifyUser = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      res.status(401).send("User not registered OR Token malfunctioned");
      return;
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      res.status(401).send("Permissions didn't match");
      return;
    }

    res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// User logout handler
export const userLogout = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      res.status(401).send("User not registered OR Token malfunctioned");
      return;
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      res.status(401).send("Permissions didn't match");
      return;
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
