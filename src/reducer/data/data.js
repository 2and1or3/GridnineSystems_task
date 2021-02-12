import { extend } from '@/utils';

const initialState = {
  flights: [],
};

const ActionType = {
  SET_FLIGHTS: 'setFlights',
};

const ActionCreator = {
  setFlights: (flights) => ({
    type: ActionType.SET_FLIGHTS,
    payload: flights,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FLIGHTS:
      return extend(state, { flights: action.payload });

    default:
      return state;
  }
};

export {
  reducer, ActionType, ActionCreator,
};
