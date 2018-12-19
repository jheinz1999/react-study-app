// reducer.js - global reducer for redux store

import { EMAIL_CHECK, SUCCESS, FAILURE, ACKNOWLEDGEMENT, EMAIL, PASSWORD, SIGNUP, LOGIN_STATUS } from './actions';

const initialState = {

  emailStatus: null,
  username: null,
  loggedIn: false,
  loginStatus: EMAIL

}

export default (state = initialState, action) => {

  switch (action.type) {

    case EMAIL_CHECK:

      return {...state, emailStatus: action.payload === 200 ? SUCCESS : FAILURE}

    case ACKNOWLEDGEMENT:

      return {...state, emailStatus: null}

    case LOGIN_STATUS:

      return {...state, loginStatus: action.payload}

    default:
      return state;

  }

}
