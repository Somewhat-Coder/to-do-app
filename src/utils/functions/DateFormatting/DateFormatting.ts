import { Dayjs } from "dayjs";

/**
 * Formats the date time for task list tasks
 * @param timestamp timestamp for date time formatting
 * @returns date time in the format, 22nd Aug 25, 15:49
 */
export const extractTime = (timestamp: number): string => {
  const date = new Date(timestamp);

  const month = date.toLocaleDateString("en-US", {
    month: "short",
  });

  const day = date.toLocaleDateString("en-US", {
    day: "numeric",
  });
  const year = date.toLocaleDateString("en-US", {
    year: "2-digit",
  });

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: false,
    minute: "2-digit",
  });

  return `${day}${getDayOrdinal(day.toString())} ${month} ${year}, ${time}`;
};

/**
 * Gets the day ordinal
 * @param dayOfMonth day of month
 * @returns st, nd, rd, th
 */
export const getDayOrdinal = (dayOfMonth: string): string => {
  const day = Number(dayOfMonth);
  if (day > 31 || day < 1) return "";

  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

/**
 *  Helper function
 *  Gets the formatted Header date for js date
 * @param today javascript date object
 * @returns date in the format Friday, 22nd
 */
const getFormattedHeaderDate = (today: Date): string => {
  const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });
  const dayOfMonth = today.getDate();
  const ordinal = getDayOrdinal(dayOfMonth.toString());

  return `${dayOfWeek}, ${dayOfMonth}${ordinal}`;
};

/**
 * Gets the header date and month
 * @param selectedDate user selected date in Dayjs, if null uses todays's date
 * @param getMonth if true get the month name or the formatted header date for Dayjs
 * @returns month name or date in the format Friday, 22nd
 */
export const getHeaderDateAndMonth = (
  selectedDate: Dayjs | null,
  getMonth: boolean
): string => {
  const today = new Date();

  if (getMonth) {
    return selectedDate === null
      ? today.toLocaleDateString("en-US", { month: "long" })
      : `${selectedDate.format("MMMM")}`;
  }

  if (selectedDate === null) {
    return getFormattedHeaderDate(today);
  } else {
    const dayOfMonth = selectedDate.format("D");
    return `${selectedDate.format("dddd")}, ${dayOfMonth}${getDayOrdinal(
      dayOfMonth
    )}`;
  }
};
