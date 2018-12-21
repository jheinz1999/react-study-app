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
export const UPDATE_IMG = 'UPDATE_IMG';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAIL = 'GET_POSTS_FAIL';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAIL = 'ADD_POST_FAIL';
export const DELETE_POST = 'DELETE_POST';
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';

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

export const updateUsrImg = img => dispatch => {

  alert('this feature is not ready yet.');

}

export const fetchPosts = () => dispatch => {

  axios.get('https://lambda-study-app.herokuapp.com/api/posts')
    .then(res => dispatch({
      type: GET_POSTS_SUCCESS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_POSTS_FAIL
    }));

}

export const addPost = post => dispatch => {

  const options = {

    headers: {

      Authorization: JSON.parse(localStorage.user).token

    }

  }

  axios.post('https://lambda-study-app.herokuapp.com/api/posts', post, options)
    .then(res => dispatch({
      type: ADD_POST_SUCCESS,
      payload: res.status
    }))
    .catch(err => err.response.status == 401 ? dispatch({
      type: LOGOUT
    }) : dispatch({
      type: ADD_POST_FAIL
    }));

}

export const deletePost = id => dispatch => {

  const options = {

    headers: {

      Authorization: JSON.parse(localStorage.user).token

    }

  }

  axios.delete(`https://lambda-study-app.herokuapp.com/api/posts/${id}`, options)
    .then(res => dispatch({
      type: DELETE_POST
    }))
    .catch(err => dispatch({
      type: LOGOUT
    }));

}

export const addComment = (id, comment) => dispatch => {

  const options = {

    headers: {

      Authorization: JSON.parse(localStorage.user).token

    }

  }

  axios.post(`https://lambda-study-app.herokuapp.com/api/posts/${id}/comments`, {text: comment}, options)
    .then(res => dispatch({
      type: COMMENT_SUCCESS
    }))
    .catch(err => dispatch({
      type: LOGOUT
    }));

}
