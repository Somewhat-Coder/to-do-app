import { useMemo } from "react";
import { useTasksContext } from "../context/TasksContext";
import { extractTime } from "../utils/functions/DateFormatting";
import dayjs, { Dayjs } from "dayjs";
import type { TaskType } from "../Layout/Layout";
import type { TaskDataType } from "../models/Task";

/**
 * Formats and filters tasks based on status and date filters.
 * @param filter  Status filter ('Done', 'Pending', or 'All').
 * @param selectedDate Selected date for filtering, or null for no date filter.
 * @returns Formatted and filtered task array.
 */
export const useFormattedTasks = (
  filter: string,
  selectedDate: Dayjs | null
): TaskType[] => {
  const { state } = useTasksContext();
  return useMemo(() => {
    if (state.tasks.length == 0) return [];

    const isDoneFilter = filter === "Done";
    const isPendingFilter = filter === "Pending";
    const hasDateFilter = selectedDate !== null;

    return state.tasks
      .map(
        (task: TaskDataType): TaskType => ({
          // Format the fields of task for UI components
          id: task.id,
          taskText: task.text,
          checked: task.completed,
          taskTime: extractTime(task.createdAt),
          createdAt: task.createdAt,
        })
      )
      .filter((task: TaskType) => {
        //  // Filter based on task filter selected by user
        if (isDoneFilter) return task.checked;
        if (isPendingFilter) return !task.checked;
        return true;
      })
      .filter((task: TaskType) => {
        // Filter based on the date selected by user
        if (!hasDateFilter) return true;
        const taskDate = dayjs(task.createdAt);
        return (
          taskDate.date() === selectedDate.date() &&
          taskDate.month() === selectedDate.month() &&
          taskDate.year() === selectedDate.year()
        );
      });
  }, [filter, selectedDate, state]);
};
