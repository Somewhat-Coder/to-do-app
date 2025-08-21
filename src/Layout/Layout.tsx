import React from "react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import { useTasksContext } from "../context/TasksContext";
import { extractTime } from "../utils/functions/DateFormatting";

export type taskType = {
  id: string;
  taskText: string;
  taskTime: string;
  checked: boolean;
};

const Layout = () => {
  const { state } = useTasksContext();

  const formatTasks: taskType[] = state.tasks.map((task) => ({
    id: task.id,
    taskText: task.text,
    checked: task.completed,
    taskTime: extractTime(task.createdAt),
  }));

  return (
    <div>
      <Header/>
      <TaskList tasks={formatTasks} />
    </div>
  );
};

export default Layout;
