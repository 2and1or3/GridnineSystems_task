import { MONTHS, WEEK_DAYS } from '@/constants';

export const getFormattedTime = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const getFormattedDay = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = MONTHS[date.getMonth()];
  const weekDay = WEEK_DAYS[date.getDay()];

  return `${day} ${month}, ${weekDay}`;
};

export const getFormattedDuration = (timeInMin) => {
  const hours = Math.floor(timeInMin / 60);
  const minutes = timeInMin - hours * 60;

  return `${hours} ч ${minutes} мин`;
};
