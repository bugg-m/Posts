import { postModel } from "../models/postModel.js";
import { userModel } from "../models/userModel.js";
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
    const post = await postModel.create({
      title,
      description,
      image: {
        public_id: (await fileCloud).public_id,
        url: (await fileCloud).secure_url,
      },
      owner: req.user,
    });
    const owner = await userModel.findById(req.user._id);
    owner.posts.push(post._id);
    await owner.save();
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

export const likePost = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong" });
    console.log(req?.user?._id);

    if (post?.likes?.includes(req.user?._id)) {
      const userId = post?.likes?.indexOf(req.user?._id);
      post?.likes?.splice(userId, 1);
      await post?.save();
      return res.status(200).json({
        success: true,
        message: "Post Unliked",
        likes: post?.likes,
        isLiked: false,
      });
    } else {
      post?.likes?.push(req.user._id);
      await post?.save();
      return res.status(200).json({
        success: true,
        message: "Post Liked",
        likes: post?.likes,
        isLiked: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllLikes = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong" });

    return res.status(200).json({
      success: true,
      likes: post?.likes,
    });
  } catch (error) {
    next(error);
  }
};

export const commentPost = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong" });

    return res.status(200).json({
      success: true,
      comments: post?.comments,
    });
  } catch (error) {
    next(error);
  }
};

// TODO: To fix the req.body.comment undefined
export const addComments = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post)
      return res.status(404).json({
        success: false,
        message: "Something went wrong. Try again...",
      });
    console.log(req?.body?.comment);
    const commentData = {
      user: req.user._id,
      comment: "req.body.comment",
    };

    post?.comments?.push(commentData);

    await post.save();
    return res.status(200).json({
      success: true,
      comments: post?.comments,
      message: "Comment added",
    });
  } catch (error) {
    next(error);
  }
};
export const sharePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postData = await postModel.findById({ id });
    if (!postData)
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong" });
    const { shared } = req.body;
    await postModel.findByIdAndUpdate(id, {
      $set: { shared },
    });
    res.status(200).json({
      success: true,
      shared,
    });
  } catch (error) {
    next(error);
  }
};
