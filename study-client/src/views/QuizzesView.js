// view for all quizzes

import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';

import { fetchQuizzes } from '../redux/actions';

import NavBar from '../components/NavBar';
import QuizPreview from '../components/QuizPreview';

import './QuizzesView.scss';

function QuizzesView({history, quizzes, fetchQuizzes}) {

  if (!localStorage.user)
    history.push('/login');

  const [fetched, setFetched] = useState(false);

  console.log('FETCHED',fetched);

  useEffect(() => {

    if (!fetched) {

      fetchQuizzes();
      setFetched(true);

    }

  }, [fetched]);

  return (

    <>

      <NavBar />

      <div className='quizzes'>

        <div className='quizzes-header'>

          <h1>{fetched && quizzes ? 'Quizzes' : 'Loading...'}</h1>

        </div>

        <div className='quiz-list'>

          {fetched && quizzes && quizzes.filter(quiz => quiz.question_count !== 0).map((quiz, id) => <QuizPreview key={id} quiz={quiz} />)}

        </div>

      </div>

    </>

  );

}

function stateToProps(state) {

  return {

    quizzes: state.quizzes

  }

}

export default connect(stateToProps, { fetchQuizzes })(QuizzesView);
