import { useLayoutEffect, useRef, useState } from "react";
import TaskItem from "./TaskItem";

const TEXT = {
  EMPTY_STATE: "No tasks match this filter.",
};

const TaskList = ({ tasks, setTasks, setEditingTask }) => {
  const wrapperRef = useRef(null);
  const groupRef = useRef(null);
  const [groupWidth, setGroupWidth] = useState(0);
  const [repeatCount, setRepeatCount] = useState(1);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useLayoutEffect(() => {
    const updateCarouselSizes = () => {
      if (!wrapperRef.current || !groupRef.current) return;

      const wrapperWidth = wrapperRef.current.offsetWidth;
      const firstGroupWidth = groupRef.current.scrollWidth;
      if (firstGroupWidth === 0) return;

      setGroupWidth(firstGroupWidth);

      if (firstGroupWidth <= wrapperWidth) {
        setShouldAnimate(false);
        setRepeatCount(1);
        return;
      }

      const minimumTrackWidth = wrapperWidth * 2;
      const neededRepeats = Math.ceil(minimumTrackWidth / firstGroupWidth) + 1;

      setShouldAnimate(true);
      setRepeatCount(Math.max(neededRepeats, 3));
    };

    updateCarouselSizes();

    const resizeObserver = new ResizeObserver(updateCarouselSizes);
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
    if (groupRef.current) resizeObserver.observe(groupRef.current);

    return () => resizeObserver.disconnect();
  }, [tasks]);

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>{TEXT.EMPTY_STATE}</p>
      </div>
    );
  }

  const carouselKey = tasks.map((t) => t.id).join("-");

  return (
    <div className={`carousel-wrapper ${shouldAnimate ? "" : "is-static"}`} ref={wrapperRef}>
      <div
        key={carouselKey}
        className={`carousel-track ${shouldAnimate ? "" : "is-static"}`}
        style={{
          "--scroll-distance": `${groupWidth}px`,
          visibility: groupWidth === 0 ? "hidden" : "visible"
        }}
      >
        {Array.from({ length: repeatCount }).map((_, groupIndex) => (
          <div
            className="carousel-group"
            ref={groupIndex === 0 ? groupRef : null}
            key={`group-${groupIndex}`}
          >
            {tasks.map((task) => (
              <div
                className="carousel-slide"
                key={`group-${groupIndex}-task-${task.id}`}
              >
                <TaskItem task={task} setTasks={setTasks} setEditingTask={setEditingTask} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
