import React, { useEffect, useState } from "react";
import type { FC } from "react";
import TaskItem from "../TaskItem";
import type { taskType } from "../../Layout/Layout";
import {
  delete_task,
  update_completed,
  update_text,
} from "../../utils/functions/Tasks";
import "./index.css";

interface TaskListPropType {
  tasks: taskType[];
}
const TaskList: FC<TaskListPropType> = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);
  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const deleteTask = (id: string) => {
    const updatedList: taskType[] = taskList.filter((task) => task.id != id);
    setTaskList(updatedList);
    delete_task(id);
  };

  const toggleChecked = (id: string) => {
    const updatedList: taskType[] = taskList.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    setTaskList(updatedList);
    update_completed(id);
  };

  const updateTaskText = (id: string, text: string) => {
    const updatedList: taskType[] = taskList.map((task) =>
      task.id === id ? { ...task, taskText: text } : task
    );
    setTaskList(updatedList);
    update_text(id, text);
  };

  return (
    <div className="task-list">
      {taskList.map((task) => (
        <div key={task.id}>
          <TaskItem
            id={task.id}
            taskText={task.taskText}
            taskTime={task.taskTime}
            checked={task.checked}
            setTaskText={(text: string) => updateTaskText(task.id, text)}
            toggleChecked={() => toggleChecked(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
