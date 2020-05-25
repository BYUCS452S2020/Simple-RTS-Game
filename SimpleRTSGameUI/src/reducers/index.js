import { combineReducers } from 'redux';
import authReducer, { auth } from './auth';
import modalsReducer, { modals } from './modals';

export const initialState = {
  auth: auth,
  modals: modals
}

const rootReducer = combineReducers({
  auth: authReducer,
  modals: modalsReducer
})

export default rootReducer;
