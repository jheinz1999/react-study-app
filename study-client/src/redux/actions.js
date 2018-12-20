// actions.js - redux action creators

import axios from 'axios';

export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';
export const SIGNUP = 'SIGNUP';
export const LOGGED_IN = 'LOGGED_IN';

export const EMAIL_CHECK = 'EMAIL_CHECK';
export const ACKNOWLEDGEMENT = 'ACKNOWLEDGEMENT';
export const LOGIN_STATUS = 'LOGIN_STATUS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export const checkEmail = email => dispatch => {

  const checker = {

    email: email,
    password: '*'

  }

  axios.post('https://lambda-study-app.herokuapp.com/api/auth/login', checker)
    .then(res => dispatch({
      type: EMAIL_CHECK,
      payload: {
        status: res.status,
        email: email
      }
    }))
    .catch(err => dispatch({
      type: EMAIL_CHECK,
      payload:  {
        status: err.response.status,
        email: email
      }
    }));

}

export const setLoginStatus = status => {

  return {

    type: LOGIN_STATUS,
    payload: status

  }

}

export const signUp = (username, email, password) => dispatch => {

  axios.post('https://lambda-study-app.herokuapp.com/api/auth/register', {
    username: username,
    email: email,
    password: password
  })
  .then(res => dispatch({
    type: SIGNUP_SUCCESS,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: SIGNUP_FAIL,
    payload: err
  }));

}

export const login = (email, password) => dispatch => {

  axios.post('https://lambda-study-app.herokuapp.com/api/auth/login', {
    email: email,
    password: password
  })
  .then(res => dispatch({
    type: LOGIN_SUCCESS,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: LOGIN_FAIL
  }));

}

export const loginToken = obj => {

  return {

    type: LOGIN_SUCCESS,
    payload: obj

  }

}

export const acknowledge = () => {

  return {

    type: ACKNOWLEDGEMENT

  }

}

export const logout = () => {

  return {

    type: LOGOUT

  }

}
