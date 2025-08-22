import { useRef, useState, useEffect } from "react";
import type { KeyboardEvent } from "react";
import type { FC } from "react";
import Checkbox from "@mui/material/Checkbox";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import "./index.css";
import type { taskType } from "../../Layout/Layout";
import { DEFAULT_TASK_TEXT } from "../../utils/Constants";

export interface taskItemPropType extends taskType {
  focusItem: boolean;
  onDelete: () => void;
  toggleChecked: () => void;
  setTaskText: (text: string) => void;
}

type keybpardEventType = KeyboardEvent<HTMLSpanElement>;


const TaskItem: FC<taskItemPropType> = ({
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

  const handleInputKeyDown = (e: keybpardEventType) => {
    if (e.key === "Enter") {
      e.preventDefault();
      taskTextRef.current?.blur();
    }

    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      taskText === DEFAULT_TASK_TEXT && taskTextRef.current
    ) {
      taskTextRef.current.textContent = ""
      setTaskText("")
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
  const handleInputChange = (userInput: string) => {
    if (taskTextRef.current) {
      taskTextRef.current.textContent = userInput;
      setCursorToEnd(taskTextRef.current);
      setTaskText(userInput);
    }
  };

  useEffect(() => {
    if (taskTextRef.current && taskText !== "") {
      taskTextRef.current.textContent = taskText;
      focusItem && handleInputFocus()
    }
    else{
      handleDelete()
    }
  }, []);
  // useEffect(() => {
  //   if (taskTextRef.current) {
  //     taskTextRef.current.textContent = inputText;
  //     setCursorToEnd(taskTextRef.current);
  //     setTaskText(inputText);
  //   }
  // }, [inputText]);

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
        <div className="task-item-text-container" onClick={handleInputFocus}>
          <span
            className={`task-item-text ${checked && "completed"}`}
            ref={taskTextRef}
            // onInput={(e) => setInputText(e.currentTarget.textContent)}
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
