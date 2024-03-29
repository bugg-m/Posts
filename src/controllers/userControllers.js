import { userModel } from "../../src/models/userModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../../src/utils/features.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/dataUri.js";

export const signIn = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    console.log("in func: " + rememberMe);
    const user = await userModel.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid Email" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    sendCookie(user, res, `Welcome back, ${user.name}`, 200, rememberMe);
  } catch (err) {
    next(err);
  }
};

export const signOut = (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
};

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const file = req?.file;
    if (file) {
      const fileUri = getDataUri(file);
      const fileCloud = cloudinary.v2.uploader.upload(fileUri.content);
      let user = await userModel.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      const hashedPass = await bcrypt.hash(password, 10);
      user = await userModel.create({
        name,
        email,
        password: hashedPass,
        role,
        avatar: {
          public_id: (await fileCloud).public_id,
          url: (await fileCloud).secure_url,
        },
      });
      sendCookie(user, res, "Registered successfully", 201);
    } else {
      // Handle the case where req.file is undefined
      res.status(400).json({ success: false, message: "File is missing" });
    }
  } catch (err) {
    next(err);
  }
};

export const myProfile = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
      message: `Welcome back, ${req.user.name}`,
    });
  } catch (err) {
    next(err);
  }
};
export const userProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDetails = await userModel.findById({ _id: id });
    res.status(200).json({
      success: true,
      userDetails,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUserData = async (req, res, next) => {
  try {
    const allUsers = await userModel.find();
    if (req.user.role === "admin") {
      res.json({
        success: true,
        allUsers,
      });
    } else
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
  } catch (err) {
    next(err);
  }
};

export const followUser = async (req, res, next) => {
  try {
    const userToFollow = await userModel.findById(req.params.id);
    const userThatFollows = await userModel.findById(req.user._id);
    if (!userToFollow)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (userThatFollows?.followings?.includes(userToFollow._id)) {
      const indexOfFollowing = userThatFollows?.followings?.indexOf(
        userToFollow._id
      );
      const indexOfFollower = userToFollow?.followers?.indexOf(
        userThatFollows._id
      );

      userThatFollows?.followings?.splice(indexOfFollowing, 1);
      userToFollow?.followers?.splice(indexOfFollower, 1);

      await userToFollow?.save();
      await userThatFollows?.save();

      return res.status(200).json({
        success: true,
        message: "User Unfollowed",
        followings: userThatFollows?.followings,
        isFollowing: false,
      });
    } else {
      userThatFollows?.followings?.push(userToFollow._id);
      userToFollow?.followers?.push(userThatFollows._id);

      await userToFollow?.save();
      await userThatFollows?.save();

      return res.status(200).json({
        success: true,
        message: "User followed",
        followings: userThatFollows?.followings,
        isFollowing: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const addChats = async (req, res, next) => {
  try {
    const toSendMessage = await userModel.findById(req.params.id);
    const fromSendMessage = await userModel.findById(req.user._id);
    if (!toSendMessage)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (fromSendMessage?.chatList?.includes(toSendMessage._id)) {
      return res.status(200).json({
        success: true,
        message: "User already added",
        chats: user?.chatList,
      });
    } else {
      fromSendMessage?.chatList?.push(toSendMessage._id);
      toSendMessage?.chatList?.push(fromSendMessage._id);

      await toSendMessage?.save();
      await fromSendMessage?.save();

      return res.status(200).json({
        success: true,
        message: "User added",
        chats: user?.chatList,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getChatList = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      chats: user?.chatList,
    });
  } catch (error) {
    next(error);
  }
};
