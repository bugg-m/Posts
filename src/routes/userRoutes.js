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

userRouter.get("/sign_out", signOut);
userRouter.post("/sign_in", signIn);
userRouter.post("/sign_up", signUp);
userRouter.get("/profile", isAuthenticated, myProfile);
userRouter.get("/get_all_users", isAuthenticated, getAllUserData);
export default userRouter;
