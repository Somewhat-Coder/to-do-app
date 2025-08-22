import { useState, useMemo, useEffect } from "react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import { useTasksContext } from "../context/TasksContext";
import { extractTime } from "../utils/functions/DateFormatting";
import Filters from "../components/Filters";
import dayjs, { Dayjs } from "dayjs";
import "./index.css";

export type taskType = {
  id: string;
  taskText: string;
  taskTime: string;
  checked: boolean;
  timestamp?: number;
};

const Layout = () => {
  const { state } = useTasksContext();
  const [filter, setFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const formatTasks: taskType[] = useMemo(() => {
    return state.tasks
      .map((task) => ({
        id: task.id,
        taskText: task.text,
        checked: task.completed,
        taskTime: extractTime(task.createdAt),
        createdAt: task.createdAt,
      }))
      .filter((task) => {
        if (filter === "Done") return task.checked === true;
        if (filter === "Pending") return task.checked === false;
        return true;
      })
      .filter((task) => {
        if (selectedDate === null) {
          return true;
        } else {
          const taskDate = dayjs(task.createdAt);
          if (
            taskDate.date() !== selectedDate.date() ||
            taskDate.month() !== selectedDate.month()
          ) {
            return false;
          }
        }
        return true;
      });
  }, [state.tasks, filter, selectedDate]);

  useEffect(() => {
    console.log(selectedDate?.format("dddd, DD MMMM"));
  }, [selectedDate]);
  return (
    <div className="layout">
      <Header selectedDate={selectedDate} numberOfTasks={formatTasks.length}/>
      <Filters
        filter={filter}
        setFilter={setFilter}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TaskList tasks={formatTasks} />
    </div>
  );
};

export default Layout;
