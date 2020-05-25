import { LOGIN_RESULT, LOGOUT } from '../actions';

// initialState
export const auth = {
  userId: null,
  isAuthenticated: false
};

export default function authReducer(state = auth, action) {
  switch (action.type) {
    case LOGIN_RESULT:
      return Object.assign({}, state, {
        userId: action.userId,
        isAuthenticated: action.isAuthenticated
      })
    case LOGOUT:
      return auth; // return initialState on logout
    default:
      return state;
  }
}
