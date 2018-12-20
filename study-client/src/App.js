import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { LOGGED_IN } from './redux/actions';

import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import QuizzesView from './views/QuizzesView';
import QuizView from './views/QuizView';
import ForumView from './views/ForumView';

class App extends Component {

  componentDidUpdate(prevProps) {

    if (!this.props.username && prevProps.username) {
      this.props.history.push('/login');
    }

  }

  render() {
    return (

      <div className='app'>

        <Route
          path='/'
          render={() => !this.props.userData && this.props.location.pathname !== '/login' && <Redirect to='/login' />}
        />

        <Route
          path='/login'
          render={() => <LoginView />}
        />

        <Route
          path='/dashboard'
          render={() => <DashboardView />}
        />

        <Route
          path='/quizzes'
          render={() => <QuizzesView />}
        />

        <Route
          path='/quiz/:id'
          render={() => <QuizView />}
        />

        <Route
          path='/board'
          render={() => <ForumView />}
        />

      </div>
    );
  }
}

function stateToProps(state) {

  return {

    userData: state.userData

  }

}

export default withRouter(connect(stateToProps, null)(App));
