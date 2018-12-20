import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import QuizzesView from './views/QuizzesView';
import QuizView from './views/QuizView';
import ForumView from './views/ForumView';

class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <div className='app'>

          <Route
            path='/'
            render={() => !localStorage.token && <Redirect to='/login' />}
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

      </BrowserRouter>
    );
  }
}

export default App;
