export const formatDate = (date: any) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const today = new Date(date);
  return today.toLocaleDateString("id-ID", options as Intl.DateTimeFormatOptions);
};
