import React, { type FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import "./index.css";
import type { TaskDataType } from "../../models/TaskList";
import { useTasksContext } from "../../context/TasksContext";
import { Dayjs } from "dayjs";
import { getDayOrdinal, getDefaultHeaderDate } from "../../utils/Functions/DateFormatting";
import { DEFAULT_TASK_TEXT } from "../../utils/Constants";

interface HeaderProps {
  selectedDate: Dayjs | null;
  numberOfTasks: number;
}
const Header: FC<HeaderProps> = ({selectedDate, numberOfTasks}) => {
  const { dispatch } = useTasksContext();

  const handleAddTask = () => {
    const newTask: TaskDataType = {
      id: crypto.randomUUID(),
      text: DEFAULT_TASK_TEXT,
      completed: false,
      createdAt: Date.now(),
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  const getHeaderDay = () => {
    if (selectedDate !== null) {
      const dayOfMonth = selectedDate.format("D");
      return `${selectedDate.format("dddd")}, ${dayOfMonth}${getDayOrdinal(dayOfMonth)}`;
    }
    else {
      return getDefaultHeaderDate(false);
    }
  }
    const getHeaderMonth = () => {
    if (selectedDate !== null) {
      return `${selectedDate.format("MMMM")}`;
    }
    else {
      return getDefaultHeaderDate(true);
    }
  }


  return (
    <div className="header">
      <div className="header-row-1">
        <span className="day-date-text">{getHeaderDay()}</span>
        <span className="tasks-count">{numberOfTasks} {numberOfTasks === 1 ? 'Task' : 'Tasks'}</span>
      </div>
      <div className="header-row-2">
        <span>{getHeaderMonth()}</span>
      </div>
      <div className="add-task-button-row" onClick={() => handleAddTask()}>
        <button className="add-task-button">
          <AddIcon
            style={{ fontSize: "45px", color: "white" }}
            className="add-task-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
