import { useRef, useState, useEffect } from "react";
import type { KeyboardEvent } from "react";
import type { FC } from "react";
import Checkbox from "@mui/material/Checkbox";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import "./index.css";
import type { taskType } from "../../Layout/Layout";

export interface taskItemPropType extends taskType {
  onDelete: () => void;
  toggleChecked: () => void;
  setTaskText: (text: string) => void;
}

type keybpardEventType = KeyboardEvent<HTMLSpanElement>;

const TaskItem: FC<taskItemPropType> = ({
  taskText,
  taskTime,
  checked,
  toggleChecked,
  onDelete,
  setTaskText,
}) => {
  const taskTextRef = useRef<HTMLSpanElement>(null);
  const [deleteAnimation, toggleDeleteAnimation] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(taskText);

  const handleInputKeyDown = (e: keybpardEventType) => {
    if (e.key === "Enter") {
      e.preventDefault();
      taskTextRef.current?.blur();
    }
  };

  const handleDeleteKeyDown = (e: keybpardEventType) => {
    if (e.key === "Enter" || e.key === "Space") {
      e.preventDefault();
      handleDelete();
    }
  };

  const handleDelete = () => {
    toggleDeleteAnimation(true);
    setTimeout(() => {
      onDelete();
    }, 500);
  };

  const handleCheckboxKeyDown = (e: keybpardEventType) => {
    if (e.key === "Enter" || e.key === "Space") {
      toggleChecked();
    }
  };

  const handleInputBlur = () => {
    if (taskTextRef.current) {
      taskTextRef.current.contentEditable = "false";
      taskText.trim() === "" && handleDelete(); // Delete task if text is empty
    }
  };
  const handleInputFocus = () => {
    if (!checked && taskTextRef.current) {
      taskTextRef.current.contentEditable = "true";
      setCursorToEnd(taskTextRef.current);
      taskTextRef.current?.focus();
    }
  };
  const setCursorToEnd = (inputElement: HTMLElement) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(inputElement);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };
  useEffect(() => {
    if (taskTextRef.current) {
      taskTextRef.current.textContent = inputText;
      setCursorToEnd(taskTextRef.current);
      setTaskText(inputText);
    }
    // if (taskTextRef.current && taskTextRef.current.textContent !== inputText) {
    //   taskTextRef.current.textContent = inputText;
    //   setTaskText(inputText)
    //   console.log(inputText)
    // }
  }, [inputText]);

  return (
    <div className={`task-item ${deleteAnimation && "animate-delete"}`}>
      <div className="task-item-col1">
        <Checkbox
          checked={checked}
          onChange={() => toggleChecked()}
          onKeyDown={handleCheckboxKeyDown}
          aria-label="Checkbox"
          color="success"
          sx={{ padding: 0 }}
        />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
          onClick={handleInputFocus}
        >
          <span
            className={`task-item-text ${checked && "completed"}`}
            ref={taskTextRef}
            onInput={(e) => setInputText(e.currentTarget.textContent)}
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
        {/* <span className="task-item-date-time">{taskTime}</span> */}
        <button
          className="delete-button"
          onKeyDown={handleDeleteKeyDown}
          onClick={() => handleDelete()}
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
