import { USER_RESULT } from '../actions';

// initialState
export const user = {
  username: "",
  firstName: "",
  lastName: "",
  email: ""
};

export default function userReducer(state = user, action) {
  switch (action.type) {
    case USER_RESULT:
      return Object.assign({}, state, {
        username: action.username,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email
      })
    default:
      return state;
  }
}
