import { useRef, useState, useEffect } from "react";
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

const TaskItem: FC<taskItemPropType> = ({
  taskText,
  taskTime,
  checked,
  toggleChecked,
  onDelete,
  setTaskText
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [deleteAnimation, toggleDeleteAnimation] = useState(false);
  let inputText = taskText;

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      spanRef.current?.blur();
    }
  };

  const handleDeleteKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter" || e.key === "Space") {
      e.preventDefault();
      handleDelete();
    }
  };

  const handleDelete = () => {
    toggleDeleteAnimation(true);
    setTimeout(() => {
      onDelete();
    }, 500); // match CSS transition duration
  };

  const handleCheckboxKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter" || e.key === "Space") {
      toggleChecked();
    }
  };

  const handleBlur = () => {
    spanRef.current?.blur();
  };

  useEffect(() => {
    if (spanRef.current && spanRef.current.textContent !== inputText) {
      spanRef.current.textContent = inputText;
    }
  }, [inputText]);

  return (
    <div className={`task-item ${deleteAnimation && "animate-delete"}`}>
      <div className="task-item-col1">
        <Checkbox
          checked={checked}
          onChange={(e) => toggleChecked()}
          onKeyDown={handleCheckboxKeyDown}
          aria-label="Checkbox"
          color="success"
          sx={{ padding: 0 }}
        />
        <span
          contentEditable={true}
          className={`task-item-text ${checked && "completed"}`}
          ref={spanRef}
          onInput={(e) => setTaskText(e.currentTarget.textContent)}
          aria-label="Task input"
          onBlur={handleBlur}
          onKeyDown={handleInputKeyDown}
          suppressContentEditableWarning={true}
        />
      </div>

      <div className="task-item-col1">
        <span className="task-item-time">{taskTime}</span>
        <button
          className="delete-button"
          onKeyDown={handleDeleteKeyDown}
          onClick={() => handleDelete()}
          aria-label="Delete Task"
        >
          <DeleteSharpIcon
            fontSize="large"
            className="delete-icon"
            color="error"
          />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
