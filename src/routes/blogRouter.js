import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getBlogDetails,
  getUserBlogs,
  updateBlog,
} from "../controllers/blogController.js";
import { imageUpload } from "../middlewares/image-upload.middleware.js";
import { isAuthenticated } from "../middlewares/auth.js";

const blogRouter = Router();

blogRouter.get("/getAllBlog", getAllBlog);
blogRouter.get("/getBlogDetails/:id", getBlogDetails);
blogRouter.get("/myBlogs", isAuthenticated, getUserBlogs);
blogRouter.post(
  "/createBlog",
  isAuthenticated,
  imageUpload.single("image"),
  createBlog
);
blogRouter.route("/:id").put(updateBlog).delete(deleteBlog);

export default blogRouter;
