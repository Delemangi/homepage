const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const parseMonthYear = (dateString: string): Date => {
  const [monthStr, yearStr] = dateString.split(' ');
  const monthIndex = MONTHS.indexOf(monthStr);
  return new Date(Number.parseInt(yearStr), monthIndex, 1);
};

export const calculateDuration = (
  startDateString: string,
  endDateString: string,
): string => {
  const startDate = parseMonthYear(startDateString);
  const endDate =
    endDateString === 'Present' ? new Date() : parseMonthYear(endDateString);

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);

  return parts.join(' ') || 'Recently started';
};
