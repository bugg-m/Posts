import { Router } from "express";
import {
	createBlog,
	deleteBlog,
	getAllBlog,
	getBlog,
	updateBlog,
} from "../controllers/blogController.js";
import { imageUpload } from "../middlewares/image-upload.middleware.js";

const blogRouter = Router();

blogRouter.get("/", (req, res) => {
	res.send("hello");
});
blogRouter.get("/getAllBlog", getAllBlog);
blogRouter.get("/getBlog/:id", getBlog);
blogRouter.post("/createBlog", imageUpload.single("image"), createBlog);
blogRouter.put("/updateBlog/:id", updateBlog);
blogRouter.delete("/deleteBlog/:id", deleteBlog);

export default blogRouter;
