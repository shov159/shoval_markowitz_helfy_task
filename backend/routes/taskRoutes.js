import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
  updateTaskCompletion,
} from "../taskHandlers/taskHandlers";
import { createTaskSchema, updateTaskSchema } from "../types/taskTypes";

const router = express.Router();

router.get("/", (_, res) => {
  const allTasks = getAllTasks();
  res.status(200).json(allTasks);
});

router.post("/", (req, res) => {
  const parsedTask = createTaskSchema.safeParse(req.body);
  if (!parsedTask.success) {
    return res.status(400).json({ error: parsedTask.error.message });
  }
  const createdTask = createTask(parsedTask.data);
  res.status(201).json(createdTask);
});

router.put("/:id", (req, res) => {
  const parsedTask = updateTaskSchema.safeParse(req.body);
  if (!parsedTask.success) {
    return res.status(400).json({ error: parsedTask.error.message });
  }
  const task = updateTask(req.params.id, parsedTask.data);
  res.status(200).json(task);
});

router.delete("/:id", (req, res) => {
  const deleted = deleteTask(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).send();
});

router.patch("/:id", (req, res) => {
  const completedState = updateTaskCompletion(req.params.id);
  if (completedState == null) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).send(completedState);
});

export default router;
