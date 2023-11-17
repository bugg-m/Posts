import jwt from "jsonwebtoken";

export const sendCookie = (
  user,
  res,
  message,
  statusCode = 200,
  rememberMe
) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  console.log("in cookie:" + rememberMe);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: rememberMe ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
      user,
    });
};
