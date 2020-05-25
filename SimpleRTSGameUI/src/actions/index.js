import axios from 'axios';
import history from '../history';

export const LOGIN_RESULT = 'LOGIN_RESULT';
export function loginResult(token, isAuthenticated) {
  return {
    type: LOGIN_RESULT,
    token,
    isAuthenticated
  }
}
export function login(username, password) {
  return async (dispatch) => {
    try {
      let response = await axios.post("http://localhost:4000/login", { username, password })
      if (response.status === 200) {
        // TODO: ADD AUTH TOKENS
        dispatch(loginResult(null, true));
        console.log("navigating to home page");
        history.push('/home');
      }
      else {
        handleError(response);
      }
    }
    catch (e) {
      console.log(e);
      handleError(e);
    }
  }
}

export function register(user) {
  return async (dispatch) => {
    try {
      let response = await axios.post("http://localhost:4000/register", {
        username: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      })
      if (response.status === 200) {
        // TODO: ADD AUTH TOKENS
        dispatch(loginResult(null, true));
        history.push('/home');
      }
      else {
        handleError(response);
      }
    }
    catch (e) {
      handleError(e);
    }
  }
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  history.push('/login')
  return {
    type: LOGOUT,
    token: null,
    isAuthenticated: false
  }
}

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export function toggleModal(modalId, info = "") {
  if (modalId === "error") console.log("toggle error modal");
  return {
    type: TOGGLE_MODAL,
    modalId,
    info
  }
}

export const CLOSE_MODAL = 'CLOSE_MODAL';
export function closeModal(modalId) {
  return {
    type: CLOSE_MODAL,
    modalId
  }
}


export const ERROR = "ERROR";
export function handleError(error) {
  console.log(error, error.status);
  if (error.status && error.status === 401) {
    console.log("logging out");
    return logout();
  }
  if (error.status && error.status === 400) {
    let message = error.message
    console.log("bad request", message);
    return toggleModal("error", {"title": "Uh Oh", "message": message});
  }
  return {
    type: ERROR,
    error
  }
}
