// login view

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { EMAIL, PASSWORD, SIGNUP, LOGGED_IN, loginToken } from '../redux/actions';

import UsernameForm from '../components/UsernameForm';
import PasswordForm from '../components/PasswordForm';
import SignupForm from '../components/SignupForm';

import './LoginView.scss';

function LoginView({loginStatus, loginToken}) {

  console.log(loginStatus);

  if (localStorage.user)
    loginToken(JSON.parse(localStorage.user));

  return (

    <div className='login'>

      <h1>Lambda Study App</h1>
      <h3>Sign in!</h3>

      {loginStatus === EMAIL && <UsernameForm />}
      {loginStatus === PASSWORD && <PasswordForm />}
      {loginStatus === SIGNUP && <SignupForm />}
      {loginStatus === LOGGED_IN && <Redirect to='/dashboard' />}

    </div>

  );

}

function stateToProps(state) {

  return {

    loginStatus: state.loginStatus

  }

}

export default connect(stateToProps, { loginToken })(LoginView);
