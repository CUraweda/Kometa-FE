export const capitalize = (value: string, index?: number) =>
  index != undefined && index >= 0
    ? `${value.charAt(0).toUpperCase()}${value.slice(1, value.length)}`
    : value.toUpperCase();
