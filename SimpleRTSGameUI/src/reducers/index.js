import { combineReducers } from 'redux';
import authReducer, { auth } from './auth';
import modalsReducer, { modals } from './modals';
import avatarReducer, { avatar } from './avatar';
import userReducer, { user } from './user';

export const initialState = {
  auth: auth,
  modals: modals,
  avatar: avatar,
  user: user
}

const rootReducer = combineReducers({
  auth: authReducer,
  modals: modalsReducer,
  avatar: avatarReducer,
  user: userReducer
})

export default rootReducer;
