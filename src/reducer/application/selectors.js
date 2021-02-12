import NameSpace from '@/reducer/namespace';

const NAME_SPACE = NameSpace.APP;

const getSortKey = (state) => state[NAME_SPACE].sortKey;

const getTransfers = (state) => state[NAME_SPACE].transfers;

const getPrice = (state) => state[NAME_SPACE].price;

const getAirlines = (state) => state[NAME_SPACE].airlines;

const getBanList = (state) => state[NAME_SPACE].banList;

export {
  getSortKey, getTransfers, getPrice, getAirlines, getBanList,
};
