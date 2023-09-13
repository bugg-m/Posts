import express from "express";
import {
  addTask,
  deleteTask,
  getAllTask,
  getTask,
  updateTask,
} from "../controllers/taskControllers.js";

const taskRouter = express.Router();

taskRouter.post("/add", addTask);
taskRouter.get("/get", getTask);
taskRouter.get("/getAll", getAllTask);
taskRouter.route("/:id").put(updateTask).delete(deleteTask);
export default taskRouter;
