import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../utils/errorHandler.js";

export const login = async (req, res, next) => {
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

export const logout = (req, res) => {
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

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return next(new ErrorHandler("User already exists", 400));
    const hashedPass = await bcrypt.hash(password, 10);
    user = await userModel.create({ name, email, password: hashedPass });
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

export const getData = async (req, res, next) => {
  try {
    const user = await userModel.find();
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};
