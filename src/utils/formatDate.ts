export function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  const now = new Date();
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const mouth = months[date.getMonth()];
  const day = date.getDate();
  const memoizedHours = date.getHours();
  const hours = memoizedHours >= 10 ? memoizedHours : `0${memoizedHours}`;
  const memoizedMinutes = date.getMinutes();
  const minutes = memoizedMinutes >= 10 ? memoizedMinutes : `0${memoizedMinutes}`;
  const difference = now.getDate() - day;

  let dateString = `${day} ${mouth}`;

  if (difference < 1) {
    dateString = `${hours}:${minutes}`;
  }

  if (difference === 1) {
    dateString = 'yesterday';
  }

  return dateString;
}
