export const formatDate = (isoDate: string): string => {
  if (!isoDate) return "Unknown Date";
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "Invalid Date";
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);
};
