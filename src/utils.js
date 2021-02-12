import { MONTHS, WEEK_DAYS } from '@/constants';

const getFormattedTime = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const getFormattedDay = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = MONTHS[date.getMonth()];
  const weekDay = WEEK_DAYS[date.getDay()];

  return `${day} ${month}, ${weekDay}`;
};

const getFormattedDuration = (timeInMin) => {
  const hours = Math.floor(timeInMin / 60);
  const minutes = timeInMin - hours * 60;

  return `${hours} ч ${minutes} мин`;
};

const extend = (a, b) => ({ ...a, ...b });

const getUniqs = (arr) => {
  const uniqs = new Set();

  arr.forEach((el) => uniqs.add(el));

  return Array.from(uniqs);
};

const getSegmentsLengths = (flights) => {
  const legs = flights.map((flight) => flight.flight.legs).flat(1);
  const segmentLengths = legs.map((leg) => leg.segments.length - 1);

  return segmentLengths;
};

const getMaxPriceFromFlights = (flights) => Math
  .max(...flights.map((obj) => +obj.flight.price.total.amount));

const getMinPriceFromFlights = (flights) => Math
  .min(...flights.map((obj) => +obj.flight.price.total.amount));

const getBanList = (fullBanList, arr) => {
  const correctBanList = fullBanList.slice();
  let i = 0;

  while (i < arr.length - 1) {
    const currentEl = arr[i];

    const index = correctBanList.findIndex(((banId) => banId === currentEl));

    if (~index) {
      correctBanList.splice(index, 1);
    }

    if (!correctBanList.length) {
      break;
    }

    i++;
  }

  return correctBanList;
};

export {
  getFormattedDay,
  getFormattedTime,
  getFormattedDuration,
  extend, getUniqs,
  getSegmentsLengths,
  getMaxPriceFromFlights,
  getMinPriceFromFlights,
  getBanList,
};
