import { TOGGLE_MODAL, CLOSE_MODAL } from '../actions';

// initialState
export const modals = {
  success: {
    isVisible: false,
    info: ""
  },
  error: {
    isVisible: false,
    info: ""
  },
};

export default function modalsReducer(state = modals, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      console.log("toggling", action.modalId);
      return Object.assign({}, state, {
        [action.modalId]: {
          isVisible: !state[action.modalId].isVisible,
          info: action.info
        }
      })
    case CLOSE_MODAL:
      return Object.assign({}, state, {
        [action.modalId]: {
          isVisible: false,
          info: state[action.modalId].info
        }
      })
    default:
      console.log("default");
      return state;
  }
}
