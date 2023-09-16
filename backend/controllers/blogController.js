import { blogModel } from "../models/blogModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getBlogDetails = async ({ req, res, next }) => {
  try {
    const { id } = req.params;
    const blogData = await blogModel.findById(id);
    if (!blogData)
      return next(
        new ErrorHandler({ message: "Blog not Found", statusCode: 404 })
      );

    res.status(200).json({
      success: true,
      blogData,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserBlogs = async ({ req, res, next }) => {
  try {
    const userId = req.user.id;
    const blogData = await blogModel.findById({ user: userId });
    if (!blogData)
      return next(
        new ErrorHandler({ message: "Blog not Found", statusCode: 404 })
      );
    res.status(200).json({
      success: true,
      blogData,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBlog = async ({ req, res, next }) => {
  try {
    const blogData = await blogModel.find();
    res.status(200).json({
      success: true,
      blogData,
    });
  } catch (error) {
    next(error);
  }
};
export const createBlog = async ({ req, res, next }) => {
  try {
    const { title, description } = req.body;
    const image = req.file.path;
    // console.log(image);
    await blogModel.create({ title, description, image, user: req.user });
    res.status(200).json({
      success: true,
      message: "Blog Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const updateBlog = async ({ req, res, next }) => {
  try {
    const { id } = req.params;
    const blogData = await blogModel.findById({ id });
    if (!blogData)
      return next(
        new ErrorHandler({ message: "Blog not Found", statusCode: 404 })
      );
    const { title, description, image } = req.body;
    await blogModel.findByIdAndUpdate(id, {
      $set: { title, description, image },
    });
    res.status(200).json({
      success: true,
      message: "Blog updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteBlog = async ({ req, res, next }) => {
  try {
    const { id } = req.params;
    const blogData = await blogModel.findById({ id });
    if (!blogData)
      return next(
        new ErrorHandler({ message: "Blog not Found", statusCode: 404 })
      );
    await blogModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
