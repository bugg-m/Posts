import express from "express";
import blogRouter from "./src/routes/blogRouter.js";
import userRouter from "./src/routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./src/middlewares/error.js";
import { config } from "dotenv";
import cors from "cors";
config({
  path: "./.env",
});

const URL =
  process.env.NODE_ENV === "Development"
    ? process.env.FRONTEND_URI_DEVELOPMENT
    : process.env.FRONTEND_URI_PRODUCTION;

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.static("./app/dist"));
app.use(errorMiddleware);
app.use("/users", userRouter);
app.use("/blogs", blogRouter);
export default app;
