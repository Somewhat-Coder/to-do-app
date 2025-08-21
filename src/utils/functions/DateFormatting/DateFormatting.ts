export const extractTime = (timestamp: number) => {
  const date = new Date(timestamp);

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return time;
};
