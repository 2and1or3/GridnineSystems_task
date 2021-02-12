const MONTHS = [
  'янв',
  'фев',
  'мар',
  'апр',
  'мая',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
];

const WEEK_DAYS = [
  'вс',
  'пн',
  'вт',
  'ср',
  'чт',
  'пт',
  'сб',
];

const SortTypes = {
  TO_UP: {
    key: 'TO_UP',
    label: 'по возрастанию цены',
    sortFn: (flightA, flightB) => (
      +flightA.flight.price.total.amount - +flightB.flight.price.total.amount),
  },
  TO_DOWN: {
    key: 'TO_DOWN',
    label: 'по убыванию цены',
    sortFn: (flightA, flightB) => (
      +flightB.flight.price.total.amount - +flightA.flight.price.total.amount),
  },
  TO_MAX_TIME: {
    key: 'TO_MAX_TIME',
    label: 'по времени в пути',
    sortFn: (flightA, flightB) => (
      +flightA.flight.legs[0].duration - +flightB.flight.legs[0].duration),
  },
};

export { MONTHS, WEEK_DAYS, SortTypes };
