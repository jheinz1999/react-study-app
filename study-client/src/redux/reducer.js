// reducer.js - global reducer for redux store

import { EMAIL_CHECK, SUCCESS, FAILURE, ACKNOWLEDGEMENT, EMAIL, PASSWORD, SIGNUP, LOGGED_IN, LOGIN_STATUS, SIGNUP_SUCCESS, SIGNUP_FAIL,
LOGIN_SUCCESS, LOGIN_FAIL } from './actions';

const initialState = {

  emailStatus: null,
  username: null,
  loggedIn: false,
  loginStatus: EMAIL,
  signupStatus: null,
  email: null,
  passwordStatus: null

}

export default (state = initialState, action) => {

  switch (action.type) {

    case EMAIL_CHECK:

      return {...state, email: action.payload.email, emailStatus: action.payload.status !== 404 ? SUCCESS : FAILURE}

    case ACKNOWLEDGEMENT:

      return {...state, emailStatus: null, signupStatus: null, passwordStatus: null}

    case LOGIN_STATUS:

      return {...state, loginStatus: action.payload}

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:

      localStorage.token = action.payload.token;
      return {...state, username: action.payload.user.username, loginStatus: LOGGED_IN}

    case SIGNUP_FAIL:

      return {...state, signupStatus: FAILURE}

    case LOGIN_FAIL:

      return {...state, passwordStatus: FAILURE}

    default:
      return state;

  }

}
