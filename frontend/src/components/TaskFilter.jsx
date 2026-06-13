const FILTER_VALUES = {
  ALL: "all",
  COMPLETED: "completed",
  PENDING: "pending",
};

const TEXT = {
  FILTER_ALL: "All",
  FILTER_COMPLETED: "Completed",
  FILTER_PENDING: "Pending",
};

const TaskFilter = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="task-filter">
      <button
        type="button"
        className={currentFilter === FILTER_VALUES.ALL ? "active-filter" : ""}
        onClick={() => onFilterChange(FILTER_VALUES.ALL)}
      >
        {TEXT.FILTER_ALL}
      </button>

      <button
        type="button"
        className={currentFilter === FILTER_VALUES.COMPLETED ? "active-filter" : ""}
        onClick={() => onFilterChange(FILTER_VALUES.COMPLETED)}
      >
        {TEXT.FILTER_COMPLETED}
      </button>

      <button
        type="button"
        className={currentFilter === FILTER_VALUES.PENDING ? "active-filter" : ""}
        onClick={() => onFilterChange(FILTER_VALUES.PENDING)}
      >
        {TEXT.FILTER_PENDING}
      </button>
    </div>
  );
};

export default TaskFilter;
