import { blogModel } from "../models/blogModel.js";
import { getDataUri } from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

export const getBlogDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogData = await blogModel.findById(id);
    if (!blogData) return next(new ErrorHandler("Blog not Found", 404));

    res.status(200).json({
      success: true,
      blogData,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserBlogs = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const blogData = await blogModel.findById({ user: userId });
    if (!blogData) return next(new ErrorHandler("Blog not Found", 404));
    res.status(200).json({
      success: true,
      blogData,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBlog = async (req, res, next) => {
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

export const createBlog = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const fileCloud = cloudinary.v2.uploader.upload(fileUri.content);
    await blogModel.create({
      title,
      description,
      image: {
        public_id: (await fileCloud).public_id,
        url: (await fileCloud).secure_url,
      },
      user: req.user,
    });
    res.status(200).json({
      success: true,
      message: "Blog Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogData = await blogModel.findById({ id });
    if (!blogData) return next(new ErrorHandler("Blog not Found", 404));
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
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogData = await blogModel.findById({ id });
    if (!blogData) return next(new ErrorHandler("Blog not Found", 404));
    await blogModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
