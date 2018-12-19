// login view

import React from 'react';
import { connect } from 'react-redux';

import { EMAIL, PASSWORD, SIGNUP } from '../redux/actions';

import UsernameForm from '../components/UsernameForm';

function LoginView({loginStatus}) {

  console.log(loginStatus);

  if (localStorage.user)
    return <h1>Logged in!</h1>

  return (

    <div className='login'>

      {loginStatus === EMAIL && <UsernameForm />}
      {loginStatus === PASSWORD && }
      {loginStatus === SIGNUP && <h1>Sign Up</h1>}

    </div>

  );

}

function stateToProps(state) {

  return {

    loginStatus: state.loginStatus

  }

}

export default connect(stateToProps, null)(LoginView);
