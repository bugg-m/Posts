import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostDetails,
  getUserPosts,
  updatePost,
} from "../controllers/postController.js";
import { imageUpload } from "../middlewares/image-upload.middleware.js";
import { isAuthenticated } from "../middlewares/auth.js";

const postRouter = Router();

postRouter.get("/getAllPost", getAllPost);
postRouter.get("/getPostDetails/:id", getPostDetails);
postRouter.get("/myPosts", isAuthenticated, getUserPosts);
postRouter.post(
  "/createPost",
  isAuthenticated,
  imageUpload.single("image"),
  createPost
);
postRouter.route("/:id").put(updatePost).delete(deletePost);

export default postRouter;
