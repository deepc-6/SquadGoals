import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { players } from './players.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  players,
  alert,
});

export default rootReducer;
