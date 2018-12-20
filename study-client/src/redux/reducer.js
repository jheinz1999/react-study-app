// reducer.js - global reducer for redux store

import { EMAIL_CHECK, SUCCESS, FAILURE, ACKNOWLEDGEMENT, EMAIL, PASSWORD, SIGNUP, LOGGED_IN, LOGIN_STATUS, SIGNUP_SUCCESS, SIGNUP_FAIL,
LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './actions';

const initialState = {

  emailStatus: null,
  userData: null,
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

      localStorage.user = JSON.stringify(action.payload);
      return {...state, userData: action.payload, loginStatus: LOGGED_IN}

    case SIGNUP_FAIL:

      return {...state, signupStatus: FAILURE}

    case LOGIN_FAIL:

      return {...state, passwordStatus: FAILURE}

    case LOGOUT:

      localStorage.clear();
      console.log("LOGGED OUT");
      return {...state, username: null, loginStatus: EMAIL}

    default:
      return state;

  }

}
