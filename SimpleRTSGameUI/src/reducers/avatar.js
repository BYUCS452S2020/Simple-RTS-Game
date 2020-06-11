import { AVATAR_RESULT, LOGIN_RESULT, LOGOUT } from '../actions';

// initialState
export const avatar = {
  happy: "",
  mad: "",
  mocking: ""
};

export default function avatarReducer(state = avatar, action) {
  switch (action.type) {
    case AVATAR_RESULT:
      return Object.assign({}, state, {
        happy: action.happy,
        mad: action.mad,
        mocking: action.mocking
      })
    case LOGIN_RESULT:
      return avatar;
    case LOGOUT:
      return avatar;
    default:
      return state;
  }
}
