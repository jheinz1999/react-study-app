// actions.js - redux action creators

import axios from 'axios';

export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';
export const SIGNUP = 'SIGNUP';

export const EMAIL_CHECK = 'EMAIL_CHECK';
export const ACKNOWLEDGEMENT = 'ACKNOWLEDGEMENT';
export const LOGIN_STATUS = 'LOGIN_STATUS';

export const checkEmail = email => dispatch => {

  const checker = {

    email: email,
    password: '*'

  }

  axios.post('https://lambda-study-app.herokuapp.com/api/auth/login', checker)
    .then(res => dispatch({
      type: EMAIL_CHECK,
      payload: res.status
    }))
    .catch(err => dispatch({
      type: EMAIL_CHECK,
      payload: err.response.status
    }));

}

export const setLoginStatus = status => {

  return {

    type: LOGIN_STATUS,
    payload: status

  }

}

export const acknowledge = () => {

  return {

    type: ACKNOWLEDGEMENT

  }

}
