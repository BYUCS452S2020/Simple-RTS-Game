import { LOGIN_RESULT, LOGOUT } from '../actions';

// initialState
export const auth = {
  token: null,
  isAuthenticated: false
};

export default function authReducer(state = auth, action) {
  switch (action.type) {
    case LOGIN_RESULT:
      return Object.assign({}, state, {
        token: action.token,
        isAuthenticated: action.isAuthenticated
      })
    case LOGOUT:
      return auth; // return initialState on logout
    default:
      return state;
  }
}
