import { useEffect, useMemo, useState } from "react";
import "./App.css";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getAllTasks } from "./services/taskService";

const FILTER_VALUES = Object.freeze({
  ALL: "all",
  COMPLETED: "completed",
  PENDING: "pending",
});

const TEXT = {
  LOADING: "Loading tasks...",
  ERROR_LOAD_TASKS: "Could not load tasks",
  APP_TITLE: "Shoval's Task Manager",
  APP_SUBTITLE: "Create, organize, and track your tasks.",
  TITLE_ADD_TASK: "Add Task",
  TITLE_EDIT_TASK: "Edit Task",
  TITLE_TASKS: "Tasks",
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch {
        setError(TEXT.ERROR_LOAD_TASKS);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === FILTER_VALUES.COMPLETED) {
        return task.completed;
      }

      if (filter === FILTER_VALUES.PENDING) {
        return !task.completed;
      }

      return true;
    });
  }, [tasks, filter]);

  if (loading) {
    return (
      <main className="app">
        <div className="loading-state">{TEXT.LOADING}</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="app">
        <div className="error-state">{error}</div>
      </main>
    );
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>{TEXT.APP_TITLE}</h1>
        <p>{TEXT.APP_SUBTITLE}</p>
      </header>

      <div className="app-content">
        <div className={`panel add-task ${editingTask ? "edit-mode" : ""}`}>
          <h2>{editingTask ? TEXT.TITLE_EDIT_TASK : TEXT.TITLE_ADD_TASK}</h2>
          <TaskForm
            setTasks={setTasks}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />
        </div>

        <div className="panel">
          <h2>{TEXT.TITLE_TASKS}</h2>
          <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
          <TaskList
            tasks={filteredTasks}
            setTasks={setTasks}
            setEditingTask={setEditingTask}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
