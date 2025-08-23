import { useState} from "react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import Filters from "../components/Filters";
import { Dayjs } from "dayjs";
import { useFormattedTasks } from "../hooks/useFormattedTasks";
import "./index.css";
import { FILTERS_LIST } from "../utils/defs";

export type TaskType = {
  id: string;
  taskText: string;
  taskTime: string;
  checked: boolean;
  createdAt?: number;
};

const Layout = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [filter, setFilter] = useState(FILTERS_LIST[0]);
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
