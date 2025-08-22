import type { TaskDataType, TaskDataListType } from "../models/Task";

// Custom type for state management
export type TasksState = {
  tasks: TaskDataListType;
  newTaskCreated: boolean;
};

// Action name and payload type
export type TasksActionType =
  | { type: "ADD_TASK"; payload: TaskDataType }
  | { type: "UPDATE_TEXT"; payload: { id: string; text: string } }
  | { type: "TOGGLE_COMPLETED"; payload: { id: string } }
  | { type: "DELETE_TASK"; payload: { id: string } };

export const initialState: TasksState = {
  tasks: [],
  newTaskCreated: false,
};

export const tasksReducer = (
  state: TasksState,
  action: TasksActionType
): TasksState => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        newTaskCreated: true,
      };
    case "UPDATE_TEXT":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task
        ),
        newTaskCreated: false,
      };
    case "TOGGLE_COMPLETED":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        ),
        newTaskCreated: false,
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((tasks) => tasks.id !== action.payload.id),
        newTaskCreated: false,
      };
    default:
      throw new Error(`Unknown action type: ${(action as any).type}`);
  }
};
