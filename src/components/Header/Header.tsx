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
        <span className="day-date-text" data-testid="day-date-text">{getHeaderDay()}</span>
        <span className="tasks-count" data-testid="tasks-count">
          {numberOfTasks} {numberOfTasks === 1 ? "Task" : "Tasks"}
        </span>
      </div>
      <div className="header-row-2">
        <span data-testid="month-text">{getHeaderMonth()}</span>
      </div>
      <div className="add-task-button-row" onClick={() => handleAddTask()}>
        <button className="add-task-button" aria-label="add-task" data-testid="add-task-button">
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
