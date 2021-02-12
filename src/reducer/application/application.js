import {
  extend, getUniqs, getSegmentsLengths,
} from '@/utils';
import { SortTypes } from '@/constants';

import { ActionCreator as DataActionCreator } from '@/reducer/data/data';

function generateTransfers(nums) {
  return nums.map((num) => ({
    id: `transfer-${num}`,
    label: num ? `кол-во пересадок: ${num}` : 'без пересадок',
    checked: false,
    quantity: num,
  }));
}

const initialState = {
  sortKey: SortTypes.TO_UP.key,
  transfers: [],
  price: {
    min: '',
    max: '',
  },
  airlines: {},
  banList: {
    transferIds: [],
    airlineIds: [],
  },
};

const ActionType = {
  FILL_STORE: 'fillStore',
  SET_TRANSFERS: 'setTransfers',
  SET_AIRLINES: 'setAirlines',
  CHANGE_SORT: 'changeSort',
  CHECK_TRANSFER: 'checkTransfer',
  CHECK_AIRLINE: 'checkAirline',
  SET_MIN_PRICE: 'setMinPrice',
  SET_MAX_PRICE: 'setMaxPrice',
  UPDATE_BAN_LIST: 'updateBanList',
};

const ActionCreator = {
  setTransfers: (transfers) => ({
    type: ActionType.SET_TRANSFERS,
    payload: transfers,
  }),
  setAirlines: (airlines) => ({
    type: ActionType.SET_AIRLINES,
    payload: airlines,
  }),
  changeSort: (sortKey) => ({
    type: ActionType.CHANGE_SORT,
    payload: sortKey,
  }),
  checkTransfer: (id) => ({
    type: ActionType.CHECK_TRANSFER,
    payload: id,
  }),
  checkAirline: (id) => ({
    type: ActionType.CHECK_AIRLINE,
    payload: id,
  }),
  setMinPrice: (price) => ({
    type: ActionType.SET_MIN_PRICE,
    payload: price,
  }),
  setMaxPrice: (price) => ({
    type: ActionType.SET_MAX_PRICE,
    payload: price,
  }),
  updateBanList: (banObj) => ({
    type: ActionType.UPDATE_BAN_LIST,
    payload: banObj,
  }),
};

const reducer = (state = initialState, action) => {
  const getUpdatedTransfers = (id) => state.transfers.map(
    (transfer) => (
      transfer.id === id ? extend(transfer, { checked: !transfer.checked }) : transfer
    ),
  );

  switch (action.type) {
    case ActionType.CHANGE_SORT:
      return extend(state, { sortKey: action.payload });

    case ActionType.SET_TRANSFERS:
      return extend(state, { transfers: action.payload });

    case ActionType.SET_AIRLINES:
      return extend(state, { airlines: action.payload });

    case ActionType.CHECK_TRANSFER:
      return extend(state, { transfers: getUpdatedTransfers(action.payload) });

    case ActionType.CHECK_AIRLINE:
      return extend(state, {
        airlines: {
          ...state.airlines,
          [action.payload]: {
            id: action.payload,
            label: state.airlines[action.payload].label,
            checked: !state.airlines[action.payload].checked,
            minPrice: state.airlines[action.payload].minPrice,
          },
        },
      });

    case ActionType.SET_MIN_PRICE:
      return extend(state, {
        price: {
          min: action.payload > 0 ? action.payload : '',
          max: state.price.max,
        },
      });

    case ActionType.SET_MAX_PRICE:
      return extend(state, {
        price: {
          min: state.price.min,
          max: action.payload > 0 ? action.payload : '',
        },
      });

    case ActionType.UPDATE_BAN_LIST:
      return extend(state, {
        banList: {
          transferIds: action.payload.transfersBanList,
          airlineIds: action.payload.airlinesBanList,
        },
      });

    default:
      return state;
  }
};

const Operation = {
  fillStore: (flights) => (dispatch) => {
    dispatch(DataActionCreator.setFlights(flights));

    const segmentLengths = getSegmentsLengths(flights);
    const transfers = generateTransfers(getUniqs(segmentLengths).sort((a, b) => a - b));
    dispatch(ActionCreator.setTransfers(transfers));

    const airlinesIndex = flights
      .map((obj) => obj.flight.carrier)
      .reduce((acc, el) => {
        acc[el.uid] = {
          id: el.uid, label: el.caption, checked: false, minPrice: +Infinity,
        };

        return acc;
      }, {});

    flights.forEach((obj) => {
      const price = +obj.flight.price.total.amount;
      const airlineId = obj.flight.carrier.uid;

      if (airlinesIndex[airlineId].minPrice > price) {
        airlinesIndex[airlineId].minPrice = +price;
      }
    });
    dispatch(ActionCreator.setAirlines(airlinesIndex));
  },
};

export {
  reducer, ActionType, ActionCreator, Operation,
};
