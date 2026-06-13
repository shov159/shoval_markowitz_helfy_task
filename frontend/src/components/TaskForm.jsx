import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, updateTask } from "../services/taskService";

const PRIORITY_VALUES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

const PRIORITY_OPTIONS = [
  { value: PRIORITY_VALUES.LOW, label: "Low" },
  { value: PRIORITY_VALUES.MEDIUM, label: "Medium" },
  { value: PRIORITY_VALUES.HIGH, label: "High" },
];

const TEXT = {
  LABEL_TITLE: "Title",
  LABEL_DESCRIPTION: "Description",
  LABEL_PRIORITY: "Priority",
  PLACEHOLDER_TITLE: "Enter task title",
  PLACEHOLDER_DESCRIPTION: "Enter task description",
  BUTTON_ADD: "Add Task",
  BUTTON_UPDATE: "Update Task",
  BUTTON_SAVING: "Saving...",
  BUTTON_CANCEL: "Cancel",
  ERROR_UPDATE: "Failed to update task. Please try again.",
};

const TaskForm = ({ setTasks, editingTask, setEditingTask }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: PRIORITY_VALUES.MEDIUM,
    },
  });

  useEffect(() => {
    if (editingTask) {
      reset({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
      });
    } else {
      reset({
        title: "",
        description: "",
        priority: PRIORITY_VALUES.MEDIUM,
      });
    }
  }, [editingTask, reset]);

  const onSubmit = async (data) => {
    if (editingTask) {
      const updatedTask = {
        ...editingTask,
        ...data,
      };

      const success = await updateTask(updatedTask);

      if (success) {
        setTasks((prev) =>
          prev.map((t) => (t.id === editingTask.id ? updatedTask : t)),
        );
        setEditingTask(null);
        reset();
      } else {
        alert(TEXT.ERROR_UPDATE);
      }
    } else {
      const createdTask = await createTask({
        ...data,
        completed: false,
      });
      setTasks((prev) => [createdTask, ...prev]);
      reset();
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
    reset();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        {TEXT.LABEL_TITLE}
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder={TEXT.PLACEHOLDER_TITLE}
        />
      </label>

      <label>
        {TEXT.LABEL_DESCRIPTION}
        <textarea
          {...register("description")}
          placeholder={TEXT.PLACEHOLDER_DESCRIPTION}
        />
      </label>

      <label>
        {TEXT.LABEL_PRIORITY}
        <select {...register("priority")}>
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? TEXT.BUTTON_SAVING
            : editingTask
            ? TEXT.BUTTON_UPDATE
            : TEXT.BUTTON_ADD}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={handleCancel}
            className="button-secondary"
            disabled={isSubmitting}
          >
            {TEXT.BUTTON_CANCEL}
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
