import { userModel } from "../../src/models/userModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../../src/utils/features.js";
import ErrorHandler from "../../src/utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Email", 400));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler("Invalid Password", 400));
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
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
    let user = await userModel.findOne({ email });
    if (user) return next(new ErrorHandler("User already exists", 400));
    const hashedPass = await bcrypt.hash(password, 10);
    user = await userModel.create({ name, email, password: hashedPass, role });
    sendCookie(user, res, "Registered successfully", 201);
  } catch (err) {
    next(err);
  }
};

export const myProfile = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUserData = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return next(new ErrorHandler("SignIn first", 400));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    const allUsers = await userModel.find();
    if (user.role === "admin") {
      res.json({
        success: true,
        allUsers,
      });
    } else {
      next(new ErrorHandler("Access Denied", 400));
    }
  } catch (err) {
    next(err);
  }
};
