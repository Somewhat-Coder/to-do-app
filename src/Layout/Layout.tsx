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
