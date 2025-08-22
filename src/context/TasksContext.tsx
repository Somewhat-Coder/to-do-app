import React, { createContext, useReducer, useEffect, useContext } from "react";
import { initialState, tasksReducer } from "./tasksReducer";
import type { TasksState, TasksActionType } from "./tasksReducer";

interface TasksContextType {
  state: TasksState;
  dispatch: React.Dispatch<TasksActionType>;
}

export const TasksContext = createContext<TasksContextType | undefined>(
  undefined
);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState, () => {
    const savedTasks = localStorage.getItem("tasks");
    try {
      return savedTasks ? JSON.parse(savedTasks) : initialState;
    } catch (e) {
      console.error("Error parsing localStorage:", e);
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify({...state, newTaskCreated: false}));
  }, [state]);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext must be used within TasksProvider");
  }
  return context;
};
