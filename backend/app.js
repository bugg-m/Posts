import express from "express";
import blogRouter from "./routes/blogRouter.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import { config } from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://main--post-ers.netlify.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
config({
  path: "./config.env",
});
app.use(express.static("../frontend/dist"));
app.use(errorMiddleware);
app.use("/users", userRouter);
app.use("/blogs", blogRouter);
export default app;
