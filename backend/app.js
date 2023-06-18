import express from "express";
import blogRouter from "./routes/blogRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(blogRouter);
export default app;
