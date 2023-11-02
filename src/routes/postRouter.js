import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getUserPosts,
  likePost,
  commentPost,
  updatePost,
} from "../controllers/postController.js";
import { imageUpload } from "../middlewares/image-upload.middleware.js";
import { isAuthenticated } from "../middlewares/auth.js";

const postRouter = Router();

postRouter.get("/get_all_posts", getAllPost);
postRouter.get("/get_post_details/:id", createPost);
postRouter.get("/my_posts", isAuthenticated, getUserPosts);
postRouter.post(
  "/create_post",
  isAuthenticated,
  imageUpload.single("image"),
  createPost
);
postRouter.route("/:id").put(updatePost).delete(deletePost);
postRouter.get("/like/:id", isAuthenticated, likePost);
postRouter.put("/comment/:id", commentPost);

export default postRouter;
