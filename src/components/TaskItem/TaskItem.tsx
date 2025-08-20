import Checkbox from "@mui/material/Checkbox";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { useRef, useState } from "react";
import "./index.css";

const TaskItem = () => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [checked, setChecked] = useState(false);
  const [deleteTask, toggleDeleteTask] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      spanRef.current?.blur();
    }
  };

  const handleBlur = () => {
    // Optional: trim text or save changes here
    spanRef.current?.blur();
  };


  return (
    <div className={`task-item ${deleteTask && "animate-delete"}`}>
      <div className="task-item-col1">
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setChecked(!checked);
            }
          }}
          aria-label="Checkbox"
          color="success"
          sx={{ padding: 0 }}
        />
        <span
          contentEditable="true"
          className={`task-item-text ${checked && "completed"}`}
          ref={spanRef}
          aria-label="Task input"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          suppressContentEditableWarning={true}
        >
          Get Milk
        </span>
      </div>
      <button
        className="delete-button"
        onKeyDown={() => {
          toggleDeleteTask(true)
        }}
        onClick={() => {
          toggleDeleteTask(true)
        }}
        aria-label="Delete Task"
      >
        <DeleteSharpIcon
          fontSize="large"
          className="delete-icon"
          color="error"
        />
      </button>
    </div>
  );
};

export default TaskItem;
