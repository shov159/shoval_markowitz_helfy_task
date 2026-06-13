import axios, { HttpStatusCode } from "axios";

export const API_BASE_ROUTE = "/api/tasks";

export const getAllTasks = async () => {
  try {
    const res = await axios.get(API_BASE_ROUTE);
    return res.data;
  } catch {
    return false;
  }
};

export const createTask = async (task) => {
  try {
    const res = await axios.post(API_BASE_ROUTE, task);
    return res.data;
  } catch {
    return null;
  }
};

export const updateTask = async (task) => {
  try {
    const res = await axios.put(`${API_BASE_ROUTE}/${task.id}`, task);
    return res.status === HttpStatusCode.Ok;
  } catch {
    return false;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await axios.delete(`${API_BASE_ROUTE}/${taskId}`);
    return res.status === HttpStatusCode.NoContent;
  } catch {
    return false;
  }
};

export const updateTaskCompletion = async (taskId) => {
  try {
    const res = await axios.patch(`${API_BASE_ROUTE}/${taskId}`);
    return res.data;
  } catch {
    return false;
  }
};
