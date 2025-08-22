export const extractTime = (timestamp: number) => {
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

  return `${day}${getDayOrdinal(day.toString())} ${month} '${year}, ${time}`;
};

export const getDayOrdinal = (dayString: string) => {
  const day = Number(dayString);
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

export const getDefaultHeaderDate = (getMonth: boolean) => {
  const today = new Date();

  if (getMonth) {
    return today.toLocaleDateString("en-US", { month: "long" });
  }

  const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });

  const dayOfMonth = today.getDate();
  const ordinal = getDayOrdinal(dayOfMonth.toString());

  return `${dayOfWeek}, ${dayOfMonth}${ordinal}`;
};
