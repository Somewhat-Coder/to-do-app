import type { TaskDataListType, TaskDataType } from "../../../models/TaskList";

const TASKS_KEY = "tasks";

/**
 * Gets sorted array of tasks from local storage
 * @returns sorted list of tasks from browser storage
 */
export const get_all_tasks = (): TaskDataListType => {
  try {
    const tasks = localStorage.getItem(TASKS_KEY) || null; // Get tasks from browser storage

    if (tasks !== null) {
      const tasks_list: TaskDataListType = JSON.parse(tasks);

      return tasks_list.sort((t1, t2) => t2?.createdAt - t1?.createdAt); // return list of tasks
    } else {
      return []; // return empty array
    }
  } catch (error) {
    console.error("Failed to get tasks from local storage");
    return [];
  }
};

export const add_task = (task: TaskDataType) => {
  try {
    let tasks_list: TaskDataListType = get_all_tasks(); // get tasks list from storage
    tasks_list.push(task); // add new task
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks_list)); // save updated list
  } catch (error) {
    console.error("Failed to save task to local storage:", error);
  }
};

export const delete_task = (id: string) => {
  try {
    let tasks_list: TaskDataListType = get_all_tasks(); // get tasks list from storage
    tasks_list = tasks_list.filter((task) => task.id !== id);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks_list)); // save updated list
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
};

export const update_completed = (id: string) => {
  try {
    let tasks_list: TaskDataListType = get_all_tasks(); // get tasks list from storage
      tasks_list = tasks_list.map((task) =>
      task.id === id ? { ...task, completed: !task.completed} : task
    );
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks_list)); // save updated list
  } catch (error) {
    console.error("Failed to update completed field in task", error);
  }
};

export const update_text = (id: string, text: string) => {
  try {
    let tasks_list: TaskDataListType = get_all_tasks(); // get tasks list from storage
      tasks_list = tasks_list.map((task) =>
      task.id === id ? { ...task, text: text} : task
    );
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks_list)); // save updated list
  } catch (error) {
    console.error("Failed to update completed field in task", error);
  }
};