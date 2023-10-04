import express from "express";
import postRouter from "./src/routes/postRouter.js";
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

const server = express();
server.use(errorMiddleware);
server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(
  cors({
    origin: [URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
server.use(cookieParser());
server.use(express.static("./server/dist"));
server.use("/users", userRouter);
server.use("/posts", postRouter);
export default server;
