import React, { type FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import "./index.css";
import type { TaskDataType } from "../../models/TaskList";
import { useTasksContext } from "../../context/TasksContext";


const Header: FC = () => {
  const { state, dispatch } = useTasksContext();

  const handleAddTask = () => {
    const newTask: TaskDataType = {
      id: crypto.randomUUID(),
      text: "Your task here...",
      completed: false,
      createdAt: Date.now(),
    };
    
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  return (
    <div className="header">
      <div className="header-row-1">
        <span className="day-date-text">Thursday, 10th</span>
        <span className="tasks-count">{state.tasks.length} Tasks</span>
      </div>
      <div className="header-row-2">
        <span>December</span>
      </div>
      <div className="add-task-button-row" onClick={() => handleAddTask()}>
        <button className="add-task-button">
          <AddIcon style={{ fontSize: "45px", color: 'white' }} className="add-task-icon" />
        </button>
      </div>
    </div>
  );
};

export default Header;
