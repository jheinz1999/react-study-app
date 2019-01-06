// view for all quizzes

import React from 'react';

import NavBar from '../components/NavBar';

import './QuizzesView.scss';

function QuizzesView({history}) {

  if (!localStorage.user)
    history.push('/login');

  return (

    <>

      <NavBar />

      <div className='quizzes'>

        <div className='quizzes-header'>

          <h1>Quizzes</h1>

        </div>

        <div className='quiz-list'>



        </div>

      </div>

    </>

  );

}

export default QuizzesView;
