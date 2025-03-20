// function to convert string with format 'YYYY-MM-DD' to Date object
export function convertStringToDate(dateString: string): Date {
  const [yearStr, monthStr, dayStr] = dateString.split('-');

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  return new Date(year, month, day);
}
