export const formatDate = (date: string) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date(date);
  return today.toLocaleDateString("id-ID", options as Intl.DateTimeFormatOptions);
};
