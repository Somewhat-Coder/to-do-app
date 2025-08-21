import React, { type FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import "./index.css";
import type { TaskDataType } from "../../models/TaskList";
import { add_task } from "../../utils/functions/Tasks/Tasks";
import { getTasks, type taskType } from "../../Layout/Layout";
import { extractTime } from "../../utils/functions/DateFormatting";

interface headerPropsType {
  setTasks: React.Dispatch<React.SetStateAction<taskType[]>>;
}
const Header: FC<headerPropsType> = ({ setTasks }) => {
  const handleAddTask = () => {
    const newTask: TaskDataType = {
      id: crypto.randomUUID(),
      text: "Your task here...",
      completed: false,
      createdAt: Date.now(),
    };
    add_task(newTask);
    setTasks((prev) => [
      {
        id: newTask.id,
        taskText: newTask.text,
        taskTime: extractTime(newTask.createdAt),
        checked: newTask.completed,
      },
      ...prev,
    ]);
  };

  return (
    <div className="header">
      <div className="header-row-1">
        <span className="day-date-text">Thursday, 10th</span>
        <span className="tasks-count">12 Tasks</span>
      </div>
      <div className="header-row-2">
        <span>December</span>
      </div>
      <div className="add-task-button-row" onClick={() => handleAddTask()}>
        <button className="add-task-button">
          <AddIcon style={{ fontSize: "45px" }} className="add-task-icon" />
        </button>
      </div>
    </div>
  );
};

export default Header;
