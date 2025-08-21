import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import { get_all_tasks } from "../utils/functions/Tasks/Tasks";
import { extractTime } from "../utils/functions/DateFormatting";

export type taskType = {
  id: string;
  taskText: string;
  taskTime: string;
  checked: boolean;
};


export const getTasks = () => {
  const stored_tasks = get_all_tasks();
  const task_list: taskType[] = stored_tasks.map((task) => {
    return {
      id: task.id,
      taskText: task.text,
      checked: task.completed,
      taskTime: extractTime(task.createdAt),
    };
  });
  return task_list;
};

const Layout = () => {
  const [tasks, setTasks] = useState<taskType[]>(getTasks());

  return (
    <div>
      <Header setTasks={setTasks}/>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Layout;
