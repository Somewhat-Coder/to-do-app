import { useRef, useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { DEFAULT_TASK_TEXT } from "../../utils/Constants";
import { getAiText } from "../../utils/Functions/AiText";
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
  const taskTextRef = useRef<HTMLSpanElement>(null);
  const [deleteAnimation, toggleDeleteAnimation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (taskTextRef.current && taskText !== "") {
      taskTextRef.current.textContent = taskText;
      focusItem && handleInputFocus();
    } else {
      handleDeleteTask();
    }
  }, []);

  // update the input on ui and save changes
  const setInputAndSave = (text: string) => {
    if (taskTextRef.current) {
      taskTextRef.current.textContent = text;
      setTaskText(text);
    }
  };

  // Responds to keyboard inputs on text span element
  const handleInputKeyDown = (e: keybpardEventType) => {
    if (e.key === "Enter") {
      e.preventDefault();
      taskTextRef.current?.blur();
    }
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      taskText === DEFAULT_TASK_TEXT
    ) {
      setInputAndSave("");
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

  // Responds to user clicking outside the task area
  // Deletes task if input is empty
  const handleInputBlur = () => {
    if (taskTextRef.current) {
      taskTextRef.current.contentEditable = "false";
      taskText.trim() === "" && handleDeleteTask(); // Delete task if text is empty
    }
  };

  // Enables editing task text
  const handleInputFocus = () => {
    // only allow input when task is not checked and improve test isnt selected
    if (!checked && taskTextRef.current && !loading) {
      taskTextRef.current.contentEditable = "true";
      setCursorToEnd(taskTextRef.current);
      taskTextRef.current?.focus();
    }
  };

  // Task delete handler, uses delay for animation
  const handleDeleteTask = () => {
    toggleDeleteAnimation(true);
    setTimeout(() => {
      onDelete();
    }, 500);
  };

  // Custom handler for span input cursor
  const setCursorToEnd = (inputElement: HTMLElement) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(inputElement);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const handleInputChange = (userInput: string) => {
    if (taskTextRef.current) {
      setInputAndSave(userInput);
      setCursorToEnd(taskTextRef.current);
      setTaskText(userInput);
    }
  };

  // checks if task text can be improved
  const isImprovable = (text: string) =>
    text !== DEFAULT_TASK_TEXT && text.length > 10 && !checked ? true : false;

  const improveText = async () => {
    if (taskTextRef.current) {
      setLoading(true);
      taskTextRef.current.contentEditable = "false";
      const aiTaskText = await getAiText(taskText);
      setInputAndSave(aiTaskText);
      // setLoading(false);
      /// allow text edit here
    }
  };

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
        <div className="task-item-text-container" onClick={handleInputFocus}>
          <span
            className={`task-item-text ${checked && "completed"}`}
            ref={taskTextRef}
            onInput={(e) => handleInputChange(e.currentTarget.textContent)}
            aria-label="Task input"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            tabIndex={0}
            onKeyDown={handleInputKeyDown}
            suppressContentEditableWarning={true}
          />
          <span className="task-item-date-time">{taskTime}</span>
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
          <AutoFixHighIcon
            fontSize="medium"
            className={`improve-icon ${
              loading ? "loading" : isImprovable(taskText) && "ai-effect"
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
