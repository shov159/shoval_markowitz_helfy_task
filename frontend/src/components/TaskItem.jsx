import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { deleteTask, updateTaskCompletion } from "../services/taskService";
import EditIcon from "../assets/icons/edit.svg";
import DeleteIcon from "../assets/icons/delete.svg";
import CheckIcon from "../assets/icons/check.svg";
import UndoIcon from "../assets/icons/undo.svg";

const ACTION_TYPES = {
  DELETE: "delete",
  COMPLETE: "complete",
};

const TEXT = {
  STATUS_COMPLETED: "Completed",
  STATUS_PENDING: "Pending",
  BUTTON_EDIT: "Edit",
  BUTTON_DELETE: "Delete",
  BUTTON_COMPLETE: "Complete",
  BUTTON_UNDO: "Undo",
  BUTTON_CANCEL: "Cancel",
  CONFIRM_DELETE_TITLE: "Delete Task?",
  CONFIRM_DELETE_MESSAGE: "This action cannot be undone.",
  CONFIRM_DELETE_BUTTON: "Delete",
  CONFIRM_COMPLETE_TITLE: "Mark as Complete?",
  CONFIRM_COMPLETE_MESSAGE: "This will mark the task as completed.",
  CONFIRM_COMPLETE_BUTTON: "Mark Complete",
  CONFIRM_UNDO_TITLE: "Mark as Pending?",
  CONFIRM_UNDO_MESSAGE: "This will move the task back to pending.",
  CONFIRM_UNDO_BUTTON: "Mark Pending",
};

const TaskItem = ({ task, setTasks, setEditingTask }) => {
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    if (confirmAction) {
      document.body.style.overflow = "hidden";

      const handleEscape = (e) => {
        if (e.key === "Escape") {
          setConfirmAction(null);
        }
      };

      document.addEventListener("keydown", handleEscape);

      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleEscape);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [confirmAction]);

  const handleDeleteConfirm = async () => {
    await deleteTask(task.id);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    setConfirmAction(null);
  };

  const handleCompleteConfirm = async () => {
    const completedStatus = await updateTaskCompletion(task.id);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, completed: completedStatus } : t,
      ),
    );
    setConfirmAction(null);
  };

  return (
    <>
      <div className="task-card">
        <div className="task-card-header">
          <h3
            className={
              task.completed ? "task-title completed-title" : "task-title"
            }
          >
            {task.title}
          </h3>

          <span className={`badge badge-${task.priority}`}>
            {task.priority}
          </span>
        </div>

        <p>{task.description}</p>

        <div className="task-card-footer">
          <span
            className={
              task.completed
                ? "status status-completed"
                : "status status-pending"
            }
          >
            {task.completed ? TEXT.STATUS_COMPLETED : TEXT.STATUS_PENDING}
          </span>

          <div className="task-actions">
            <button type="button" className="action-edit" onClick={() => setEditingTask(task)}>
              <img src={EditIcon} alt="" />
              <span>{TEXT.BUTTON_EDIT}</span>
            </button>
            <button
              type="button"
              className="action-delete"
              onClick={() => setConfirmAction(ACTION_TYPES.DELETE)}
            >
              <img src={DeleteIcon} alt="" />
              <span>{TEXT.BUTTON_DELETE}</span>
            </button>
            <button
              type="button"
              className={task.completed ? "action-undo" : "action-complete"}
              onClick={() => setConfirmAction(ACTION_TYPES.COMPLETE)}
            >
              <img src={task.completed ? UndoIcon : CheckIcon} alt="" />
              <span>{task.completed ? TEXT.BUTTON_UNDO : TEXT.BUTTON_COMPLETE}</span>
            </button>
          </div>
        </div>
      </div>

      {confirmAction &&
        createPortal(
          <div
            className="confirm-overlay"
            onClick={() => setConfirmAction(null)}
          >
            <div
              className="confirm-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>
                {confirmAction === ACTION_TYPES.DELETE
                  ? TEXT.CONFIRM_DELETE_TITLE
                  : task.completed
                  ? TEXT.CONFIRM_UNDO_TITLE
                  : TEXT.CONFIRM_COMPLETE_TITLE}
              </h3>
              <p>
                {confirmAction === ACTION_TYPES.DELETE
                  ? TEXT.CONFIRM_DELETE_MESSAGE
                  : task.completed
                  ? TEXT.CONFIRM_UNDO_MESSAGE
                  : TEXT.CONFIRM_COMPLETE_MESSAGE}
              </p>
              <div className="confirm-actions">
                <button
                  type="button"
                  onClick={() => setConfirmAction(null)}
                  className="button-secondary"
                >
                  {TEXT.BUTTON_CANCEL}
                </button>
                <button
                  type="button"
                  onClick={
                    confirmAction === ACTION_TYPES.DELETE
                      ? handleDeleteConfirm
                      : handleCompleteConfirm
                  }
                  className={
                    confirmAction === ACTION_TYPES.DELETE ? "button-danger" : ""
                  }
                >
                  {confirmAction === ACTION_TYPES.DELETE
                    ? TEXT.CONFIRM_DELETE_BUTTON
                    : task.completed
                    ? TEXT.CONFIRM_UNDO_BUTTON
                    : TEXT.CONFIRM_COMPLETE_BUTTON}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default TaskItem;
