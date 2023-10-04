import { postModel } from "../models/postModel.js";
import { getDataUri } from "../utils/dataUri.js";
import cloudinary from "cloudinary";

export const getPostDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postData = await postModel.findById(id);
    if (!postData)
      return res.status(404).json({
        success: false,
        message: "Post not Found",
      });
    else
      return res.status(200).json({
        success: true,
        postData,
      });
  } catch (error) {
    next(error);
  }
};
export const getUserPosts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postData = await postModel.findById({ user: userId });
    if (!postData)
      return res.status(404).json({
        success: false,
        message: "Post not Found",
      });
    else
      return res.status(200).json({
        success: true,
        postData,
      });
  } catch (error) {
    next(error);
  }
};

export const getAllPost = async (req, res, next) => {
  try {
    const postData = await postModel.find();
    res.status(200).json({
      success: true,
      postData,
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const fileCloud = cloudinary.v2.uploader.upload(fileUri.content);
    await postModel.create({
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
      message: "Post Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postData = await postModel.findById({ id });
    if (!postData)
      return res
        .status(404)
        .json({ success: false, message: "Post not Found" });

    const { title, description, image } = req.body;
    await postModel.findByIdAndUpdate(id, {
      $set: { title, description, image },
    });
    res.status(200).json({
      success: true,
      message: "Post updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postData = await postModel.findById({ id });
    if (!postData)
      return res
        .status(404)
        .json({ success: false, message: "Post not Found" });
    await postModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Post Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
