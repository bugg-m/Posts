import express from "express";
import {
  getAllUserData,
  signIn,
  signOut,
  myProfile,
  signUp,
  userProfile,
} from "../controllers/userControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { imageUpload } from "../middlewares/image-upload.middleware.js";

const userRouter = express.Router();

userRouter.get("/sign_out", signOut);
userRouter.post("/sign_in", signIn);
userRouter.get("/user_details/:id", userProfile);
userRouter.post("/sign_up", imageUpload.single("avatar"), signUp);
userRouter.get("/profile", isAuthenticated, myProfile);
userRouter.get("/get_all_users", isAuthenticated, getAllUserData);
export default userRouter;
