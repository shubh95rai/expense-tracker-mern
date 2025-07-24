import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  checkAuth,
  login,
  logout,
  register,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/check-auth", protect, checkAuth); 

export default authRouter;
