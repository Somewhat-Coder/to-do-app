import type { FC } from "react";
import TaskItem from "../TaskItem";
import type { taskType } from "../../Layout/Layout";
import { useTasksContext } from "../../context/TasksContext";
import "./index.css";

interface TaskListPropType {
  tasks: taskType[];
}
const TaskList: FC<TaskListPropType> = ({ tasks }) => {
  const { state, dispatch } = useTasksContext();

  const deleteTask = (id: string) =>
    dispatch({ type: "DELETE_TASK", payload: { id } });

  const toggleChecked = (id: string) =>
    dispatch({ type: "TOGGLE_COMPLETED", payload: { id } });

  const updateTaskText = (id: string, text: string) =>
    dispatch({ type: "UPDATE_TEXT", payload: { id, text } });

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <span className="no-tasks-text">You have no tasks 🎉</span>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <TaskItem
              id={task.id}
              focusItem={state.newTaskCreated}
              taskText={task.taskText}
              taskTime={task.taskTime}
              checked={task.checked}
              setTaskText={(text: string) => updateTaskText(task.id, text)}
              toggleChecked={() => toggleChecked(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
