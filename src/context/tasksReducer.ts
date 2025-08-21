import type { TaskDataType, TaskDataListType } from "../models/TaskList";

export interface TasksState {
  tasks: TaskDataListType;
}

export type TasksActionType =
  | { type: "ADD_TASK"; payload: TaskDataType }
  | { type: "UPDATE_TEXT"; payload: { id: string; text: string } }
  | { type: "TOGGLE_COMPLETED"; payload: { id: string } }
  | { type: "DELETE_TASK"; payload: { id: string } };

export const initialState: TasksState = {
  tasks: [],
};

export const tasksReducer = (
  state: TasksState,
  action: TasksActionType
): TasksState => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        tasks: [action.payload, ...state.tasks],
      };
    case "UPDATE_TEXT":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task
        ),
      };
    case "TOGGLE_COMPLETED":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((tasks) => tasks.id !== action.payload.id),
      };
    default:
      throw new Error(`Unknown action type: ${(action as any).type}`);
  }
};
