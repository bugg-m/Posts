import express from "express";
import {
  getData,
  login,
  logout,
  myProfile,
  register,
} from "../controllers/userControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.post("/new", register);
userRouter.get("/me", isAuthenticated, myProfile);
userRouter.get("/get", getData);
export default userRouter;
