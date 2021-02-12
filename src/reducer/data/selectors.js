import NameSpace from '@/reducer/namespace';

const NAME_SPACE = NameSpace.DATA;

const getFlights = (state) => state[NAME_SPACE].flights;

export default getFlights;
