import { combineReducers } from 'redux';
import authReducer, { auth } from './auth';
import modalsReducer, { modals } from './modals';
import avatarReducer, { avatar } from './avatar';
import userReducer, { user } from './user';
import gamesReducer, { games } from './games';

export const initialState = {
  auth: auth,
  modals: modals,
  avatar: avatar,
  user: user,
  games: games
}

const rootReducer = combineReducers({
  auth: authReducer,
  modals: modalsReducer,
  avatar: avatarReducer,
  user: userReducer,
  games: gamesReducer
})

export default rootReducer;
