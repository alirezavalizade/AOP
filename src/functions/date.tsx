export function getLast7Days(): string[] {
  const daysOfWeekShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const result = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    result.push(daysOfWeekShort[day.getDay()]);
  }

  return result.reverse();
}

export function formatISODate(isoDate: string): string {
  if (!isoDate) {
    throw new Error("Invalid date string provided");
  }

  const date = new Date(isoDate);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string provided");
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
}
