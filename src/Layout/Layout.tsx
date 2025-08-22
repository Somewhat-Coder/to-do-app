import { useState} from "react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import Filters from "../components/Filters";
import { Dayjs } from "dayjs";
import { useFormattedTasks } from "../hooks/useFormattedTasks";
import "./index.css";

export type TaskType = {
  id: string;
  taskText: string;
  taskTime: string;
  checked: boolean;
  createdAt?: number;
};

const Layout = () => {
  const [filter, setFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const formattedTasks = useFormattedTasks(filter, selectedDate);

  // const formatTasks: TaskType[] = useMemo(() => {
  //   return state.tasks
  //     .map((task) => ({                           // Format the fields of task for UI components
  //       id: task.id,
  //       taskText: task.text,
  //       checked: task.completed,
  //       taskTime: extractTime(task.createdAt),
  //       createdAt: task.createdAt,
  //     }))
  //     .filter((task) => {                         // Filter based on task filter selected by user
  //       if (filter === "Done") return task.checked === true;
  //       if (filter === "Pending") return task.checked === false;
  //       return true;
  //     })
  //     .filter((task) => {                       // Filter based on the date selected by user
  //       if (selectedDate === null) {
  //         return true;
  //       } else {
  //         const taskDate = dayjs(task.createdAt);
  //         if (
  //           taskDate.date() !== selectedDate.date() ||
  //           taskDate.month() !== selectedDate.month()
  //         ) {
  //           return false;
  //         }
  //       }
  //       return true;
  //     });
  // }, [state.tasks, filter, selectedDate]);

  return (
    <div className="layout">
      <Header selectedDate={selectedDate} numberOfTasks={formattedTasks.length}/>
      <Filters
        filter={filter}
        setFilter={setFilter}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TaskList tasks={formattedTasks} />
    </div>
  );
};

export default Layout;
