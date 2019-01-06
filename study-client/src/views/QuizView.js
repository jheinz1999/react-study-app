// quiz view

import React from 'react';

import NavBar from '../components/NavBar';

function QuizView({history}) {

  if (!localStorage.user)
    history.push('/login');

  return (

    <>

      <NavBar />

      <div className='quiz'>

        <h1>Quiz!</h1>

      </div>

    </>

  );

}

export default QuizView;
