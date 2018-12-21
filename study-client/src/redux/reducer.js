// reducer.js - global reducer for redux store

import { EMAIL_CHECK, SUCCESS, FAILURE, ACKNOWLEDGEMENT, EMAIL, PASSWORD, SIGNUP, LOGGED_IN, LOGIN_STATUS, SIGNUP_SUCCESS, SIGNUP_FAIL,
LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, GET_POSTS_SUCCESS, GET_POSTS_FAIL, ADD_POST_SUCCESS, ADD_POST_FAIL, DELETE_POST } from './actions';

const initialState = {

  emailStatus: null,
  userData: null,
  loginStatus: EMAIL,
  signupStatus: null,
  email: null,
  passwordStatus: null,
  posts: null,
  addStatus: null,
  deleteStatus: null

}

export default (state = initialState, action) => {

  switch (action.type) {

    case EMAIL_CHECK:

      return {...state, email: action.payload.email, emailStatus: action.payload.status !== 404 ? SUCCESS : FAILURE}

    case ACKNOWLEDGEMENT:

      return {...state, emailStatus: null, signupStatus: null, passwordStatus: null, addStatus: null, deleteStatus: null}

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
      return {...state, userData: null, loginStatus: EMAIL}

    case GET_POSTS_SUCCESS:

      return {...state, posts: action.payload}

    case ADD_POST_SUCCESS:

      return {...state, addStatus: SUCCESS}

    case ADD_POST_FAIL:

      return {...state, addStatus: FAILURE}

    case DELETE_POST:

      return {...state, deleteStatus: SUCCESS}

    default:
      return state;

  }

}
