// login view

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { EMAIL, PASSWORD, SIGNUP, LOGGED_IN } from '../redux/actions';

import UsernameForm from '../components/UsernameForm';
import PasswordForm from '../components/PasswordForm';
import SignupForm from '../components/SignupForm';

function LoginView({loginStatus}) {

  console.log(loginStatus);

  if (localStorage.user)
    return <h1>Logged in!</h1>

  return (

    <div className='login'>

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

export default connect(stateToProps, null)(LoginView);
