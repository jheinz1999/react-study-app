import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginToken } from './redux/actions';

import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import QuizzesView from './views/QuizzesView';
import QuizView from './views/QuizView';
import ForumView from './views/ForumView';
import PostView from './views/PostView';
import CreatePostView from './views/CreatePostView';
import CreateQuizView from './views/CreateQuizView';

class App extends Component {

  componentDidUpdate() {

    if (!localStorage.user && this.props.location.pathname !== '/login') {

      console.log('logged out');
      this.props.history.push('/login');

    }

  }

  render() {

    if (localStorage.user && !this.props.userData) {

      this.props.loginToken(JSON.parse(localStorage.user));
      console.log('logged in???');

    }

    console.log('rendering bro');

    return (

      <div className='app'>

        <Route
          exact
          path='/'
          render={() => localStorage.user ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
        />

        <Route
          path='/login'
          render={() => <LoginView />}
        />

        <Route
          path='/dashboard'
          render={props => <DashboardView {...props} />}
        />

        <Route
          path='/quizzes'
          render={props => <QuizzesView {...props} />}
        />

        <Route
          path='/quiz/:id'
          render={props => <QuizView {...props} />}
        />

        <Route
          path='/board'
          render={props => <ForumView {...props} />}
        />

        <Route
          path='/post/:id'
          render={props => <PostView {...props} />}
        />

        <Route
          path='/create/post'
          render={props => <CreatePostView {...props} />}
        />

        <Route
          path='/create/quiz'
          render={props => <CreateQuizView {...props} />}
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

export default withRouter(connect(stateToProps, { loginToken })(App));
