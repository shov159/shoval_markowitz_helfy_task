import { v4 as uuidv4 } from "uuid";

export const tasks = new Map();

export const createTask = (task) => {
  const id = uuidv4();
  tasks.set(id, { ...task, createdAt: new Date() });
  return { ...tasks.get(id), id };
};

export const getAllTasks = () => {
  return Array.from(tasks.entries()).map(([id, task]) => ({
    id,
    ...task,
  }));
};

export const deleteTask = (id) => {
  return tasks.delete(id);
};

export const updateTask = (id, task) => {
  tasks.set(id, task);
};

export const updateTaskCompletion = (id) => {
  const task = tasks.get(id);
  if (!task) {
    return null;
  }
  tasks.set(id, { ...task, completed: !task.completed });
  return tasks.get(id).completed;
};
