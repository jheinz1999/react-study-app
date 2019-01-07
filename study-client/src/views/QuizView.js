// quiz view

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavBar from '../components/NavBar';

import './QuizView.scss';

function QuizView({history, match}) {

  if (!localStorage.user)
    history.push('/login');

  const [quiz, setQuiz] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {

    if (!fetched) {

      axios.get(`https://lambda-study-app.herokuapp.com/api/quizzes/${match.params.id}`)
        .then(res => setQuiz(res.data))
        .catch(err => setQuiz('error'));

      setFetched(true);

    }

  }, [fetched]);

  if (!quiz)
    return <h1>Loading...</h1>

  if (quiz === 'error')
    return <h1>Quiz not found!</h1>

  const { title, votes, author, topic, question_count } = quiz;

  return (

    <>

      <NavBar />

      <div className='quiz'>

        <h1>{title}</h1>

        <p>A quiz by {author.username}</p>

        <p>Topic: {topic}</p>

        <p>Number of questions: {question_count}</p>

        <button>Start Quiz!</button>

      </div>

    </>

  );

}

export default QuizView;
