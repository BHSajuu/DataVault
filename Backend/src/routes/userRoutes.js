import { Router } from "express";
import {
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} from "../controllers/user-controller.js";
import { verifyToken } from "../utils/token-managar.js";

const userRoutes = Router();

userRoutes.post("/signup", userSignup);
userRoutes.post("/login", userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);

export default userRoutes;
