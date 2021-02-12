import { combineReducers } from 'redux';

import { reducer as dataReducer } from '@/reducer/data/data';
import { reducer as appReducer } from '@/reducer/application/application';
import NameSpace from '@/reducer/namespace';

export default combineReducers({
  [NameSpace.DATA]: dataReducer,
  [NameSpace.APP]: appReducer,
});
