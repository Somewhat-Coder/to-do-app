import { useRef, useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { getAiText } from "../../utils/functions/TextImprove";
import type { FC, KeyboardEvent } from "react";
import type { TaskType } from "../../Layout/Layout";
import "./index.css";

export interface TaskItemProp extends TaskType {
  focusItem: boolean;
  onDelete: () => void;
  toggleChecked: () => void;
  setTaskText: (text: string) => void;
}

type keybpardEventType = KeyboardEvent<HTMLSpanElement>;

const TaskItem: FC<TaskItemProp> = ({
  taskText,
  taskTime,
  checked,
  focusItem,
  toggleChecked,
  onDelete,
  setTaskText,
}) => {
  const taskTextRef = useRef<HTMLTextAreaElement>(null);
  const [deleteAnimation, toggleDeleteAnimation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (taskTextRef.current) {
      taskTextRef.current.textContent = taskText.trim();
      focusItem && taskTextRef.current?.focus();
    }
  }, []);

  // Responds to keyboard inputs on text span element
  const handleInputKeyDown = (e: keybpardEventType) => {
    if (e.key === "Enter") {
      e.preventDefault();
      taskTextRef.current?.blur();
    }
  };

  // Responds to keyboard inputs on delete task button
  const handleDeleteKeyDown = (e: keybpardEventType) => {
    if (e.key === "Enter" || e.key === "Space") {
      e.preventDefault();
      handleDeleteTask();
    }
  };

  // Responds to keyboard inputs on checkbox
  const handleCheckboxKeyDown = (e: keybpardEventType) => {
    if (e.key === "Enter" || e.key === "Space") {
      toggleChecked();
    }
  };

  // Task delete handler, uses delay for animation
  const handleDeleteTask = () => {
    toggleDeleteAnimation(true);
    setTimeout(() => {
      onDelete();
    }, 500);
  };

  // checks if task text can be improved
  const isImprovable = (text: string) =>
    text.length > 5 && !checked ? true : false;

  const improveText = async () => {
    setLoading(true);
    const aiTaskText = await getAiText(taskText);
    setTaskText(aiTaskText);
    setLoading(false);
  };

  const resizeTextarea = () => {
    const textarea = taskTextRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea(); // increase height to show all text
  }, [taskText]);

  return (
    <div className={`task-item ${deleteAnimation && "animate-delete"}`}>
      <div className="task-item-col1">
        <Checkbox
          checked={checked}
          onChange={() => toggleChecked()}
          onKeyDown={handleCheckboxKeyDown}
          aria-label="Task Checkbox"
          color="success"
          sx={{ padding: 0 }}
        />
        <div className="task-item-text-container">
          <textarea
            className={`task-item-text ${checked && "completed"}`}
            ref={taskTextRef}
            placeholder="Your task here"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onBlur={() => setTaskText(taskText.trim())}
            disabled={checked || loading}
            onKeyDown={handleInputKeyDown}
            rows={1}
          />
          <span
            className="task-item-date-time"
            onClick={() => taskTextRef.current?.focus()}
          >
            {taskTime}
          </span>
        </div>
      </div>

      <div className="task-item-col2">
        <button
          className="improve-button"
          onKeyDown={handleDeleteKeyDown}
          aria-label="Improve task text"
          onClick={improveText}
          disabled={!isImprovable(taskText)} //doesnt allow default or short text
        >
          <AutoAwesomeIcon
            fontSize="medium"
            className={`improve-icon ${
              loading ? "loading" : isImprovable(taskText) && "allow-improve"
            }`}
          />
        </button>
        <button
          className="delete-button"
          onKeyDown={handleDeleteKeyDown}
          onClick={() => handleDeleteTask()}
          aria-label="Delete Task"
        >
          <DeleteSharpIcon
            fontSize="medium"
            className="delete-icon"
            color="error"
          />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
