import AddIcon from "@mui/icons-material/Add";
import type { TaskDataType } from "../../models/Task";
import { useTasksContext } from "../../context/TasksContext";
import { getHeaderDateAndMonth } from "../../utils/functions/DateFormatting";
import { DEFAULT_TASK_TEXT } from "../../utils/constants";
import { Dayjs } from "dayjs";
import { type FC } from "react";
import "./index.css";

interface HeaderProps {
  selectedDate: Dayjs | null;
  numberOfTasks: number;
}
const Header: FC<HeaderProps> = ({ selectedDate, numberOfTasks }) => {
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

  const getHeaderDay = () => getHeaderDateAndMonth(selectedDate, false);
  const getHeaderMonth = () => getHeaderDateAndMonth(selectedDate, true);

  return (
    <div className="header">
      <div className="header-row-1">
        <span className="day-date-text">{getHeaderDay()}</span>
        <span className="tasks-count">
          {numberOfTasks} {numberOfTasks === 1 ? "Task" : "Tasks"}
        </span>
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
