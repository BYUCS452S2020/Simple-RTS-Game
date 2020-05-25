import { GAME_LIST, AVAILABLE_GAMES } from '../actions';

// initialState
export const games = {
  list: [],
  available: [],
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
    default:
      return state;
  }
}
