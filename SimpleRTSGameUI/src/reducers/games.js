import { GAME_LIST, AVAILABLE_GAMES, CURRENT_GAME, LOGIN_RESULT, LOGOUT } from '../actions';

// initialState
export const games = {
  list: [],
  available: [],
  current: null
};

export default function gamesReducer(state = games, action) {
  switch (action.type) {
    case GAME_LIST:
      return Object.assign({}, state, {
        list: action.games
      })
    case AVAILABLE_GAMES:
      return Object.assign({}, state, {
        available: action.games
      })
    case CURRENT_GAME:
      return Object.assign({}, state, {
        current: action.game
      })
    case LOGIN_RESULT:
      return games;
    case LOGOUT:
      return games;
    default:
      return state;
  }
}
