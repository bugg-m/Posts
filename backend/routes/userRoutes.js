import express from "express";
import {
  getAllUserData,
  signIn,
  signOut,
  myProfile,
  signUp,
} from "../controllers/userControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/sign-out", signOut);
userRouter.post("/sign-out", signIn);
userRouter.post("/sign-up", signUp);
userRouter.get("/profile", isAuthenticated, myProfile);
userRouter.get("/get-all-users", isAuthenticated, getAllUserData);
export default userRouter;
