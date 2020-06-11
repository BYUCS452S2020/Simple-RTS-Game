import axios from 'axios';
import history from '../history';
import ServiceClient from '../api';

const sc = new ServiceClient();

export const LOGIN_RESULT = 'LOGIN_RESULT';
export function loginResult(userId, isAuthenticated) {
  return {
    type: LOGIN_RESULT,
    userId,
    isAuthenticated
  }
}
export function login(username, password) {
  return async (dispatch) => {
    try {
      let response = await sc.login(username, password);
      if (response.status === 200) {
        // TODO: ADD AUTH TOKENS
        dispatch(loginResult(username, true));
        console.log("navigating to home page");
        history.push('/home');
      }
      else {
        dispatch(handleError(response));
      }
    }
    catch (e) {
      dispatch(handleError(e));
    }
  }
}

export function register(user) {
  return async (dispatch) => {
    try {
      let response = await sc.register({
        username: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      })
      if (response.status === 200) {
        // TODO: ADD AUTH TOKENS
        console.log(response);
        dispatch(loginResult(user.username, true));
        history.push('/home');
      }
      else {
        dispatch(handleError(response));
      }
    }
    catch (e) {
      dispatch(handleError(e));
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
  if (error.response) {
    error = error.response;
  }
  if (error.status && error.status === 401) {
    console.log("logging out");
    return logout();
  }
  else if (error.status && error.status === 400) {
    let message = error.data.message
    console.log("bad request");
    return toggleModal("error", {"title": "Uh Oh", "message": message});
  }
  else {
    return {
      type: ERROR,
      error
    }
  }
}

export const AVAILABLE_GAMES = "AVAILABLE_GAMES";
function availableGames(result) {
  return {
    type: AVAILABLE_GAMES,
    games: result
  }
}
export function fetchAvailableGames() {
  return async (dispatch) => {
    try {
      let response = await sc.getCurrentGames();
      dispatch(availableGames(response));
    }
    catch (e) {
      dispatch(handleError(e));
    }
  }
}
export const GAME_LIST = "GAME_LIST";
function gameListResult(result) {
  return {
    type: GAME_LIST,
    games: result
  }
}
export function fetchGames() {
  // return async (dispatch) => {
    // let response = await axios(window.location.origin + '/maps/games');
    // console.log(response);
    // if (response.status === 200) {
    //   dispatch(gameListResult(response));
    // }
  // }
  return gameListResult([
    { id: 1, name: 'level1', preview: window.location.origin + '/maps/level1.png', map: window.location.origin + '/maps/level1.json', description: "Simple 2 player map", maxPlayers: 2 },
    { id: 2, name: 'level2', preview: window.location.origin + '/maps/level2.png', map: window.location.origin + '/maps/level2.json', description: "Simple 4 player map", maxPlayers: 4 },
    { id: 3, name: 'level3', preview: window.location.origin + '/maps/level3.png', map: window.location.origin + '/maps/level3.json', description: "Simple 3 player map", maxPlayers: 3 }
  ]);
}

export const CURRENT_GAME = "CURRENT_GAME";
function currentGameResult(game) {
  return {
    type: CURRENT_GAME,
    game
  }
}

export function getMyGame() {
  return async (dispatch, getState) => {
    try {
      let response = await sc.getMyGame();
      dispatch(currentGameResult(response));
    }
    catch (e) {
      dispatch(handleError(e));
    }
  }
}

export function createGame(game) {
  return async (dispatch) => {
    try {
      let response = await sc.createGame(game);
    }
    catch (e) {
      dispatch(handleError(e))
    }
  }
}

export function joinGame(eci) {
  return async (dispatch) => {
    try {
      let response = await sc.joinGame(eci);
    }
    catch (e) {
      dispatch(handleError(e));
    }
  }
}

export const AVATAR_RESULT = 'AVATAR_RESULT';
export function avatarResult(happy, mad, mocking) {
  return {
    type: AVATAR_RESULT,
    happy,
    mad,
    mocking
  }
}

export function getAvatar() {
  return async (dispatch, getState) => {
    // try {
    //   let userId = getState().auth.userId;
    //   let response = await axios.get("http://localhost:4000/avatar/"+userId)
    //   if (response.status === 200) {
    //     dispatch(avatarResult(response.data.happy, response.data.mad, response.data.mocking));
    //   }
    //   else {
    //     handleError(response);
    //   }
    // }
    // catch (e) {
    //   console.log(e);
    //   handleError(e);
    // }
  }
}

export function setAvatar(happy, mad, mocking) {
  return async (dispatch, getState) => {
    // try {
    //   let userId = getState().auth.userId;
    //   let response = await axios.post("http://localhost:4000/avatar", {userId, happy, mad, mocking})
    //   if (response.status === 200) {
    //     dispatch(avatarResult(happy, mad, mocking));
    //   }
    //   else {
    //     handleError(response);
    //   }
    // }
    // catch (e) {
    //   console.log(e);
    //   handleError(e);
    // }
  }
}

export const USER_RESULT = 'USER_RESULT';
export function userResult(username, firstName, lastName, email) {
  return {
    type: USER_RESULT,
    username,
    firstName,
    lastName,
    email
  }
}

export function getUser() {
  return async (dispatch, getState) => {
    try {
      let response = await sc.getUserInfo()
      dispatch(userResult(response.username, response.firstName, response.lastName, response.email));
      dispatch(avatarResult(response.avatar.happy, response.avatar.mad, response.avatar.mocking));
    }
    catch(e) {
      console.log(e);
      handleError(e);
    }
  }
}

export function updateUser(options) {
  return async (dispatch, getState) => {
    try {
      let userId = getState().auth.userId;
      let username = getState().user.username;
      let response = await sc.updateUser(options);
      if (response.status === 200) {
        let user = response.user
        console.log(user);
        dispatch(userResult(user.username, user.firstName, user.lastName, user.email));
        dispatch(avatarResult(user.avatar.happy, user.avatar.mad, user.avatar.mocking));
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
