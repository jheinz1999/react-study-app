import React from 'react';
import { withRouter } from 'react-router-dom';

import './QuizPreview.scss';

function QuizPreview({quiz, history}) {

  const { id, title, votes, description, author, topic, question_count } = quiz;

  return (

    <div className='quiz-preview' onClick={() => history.push(`/quiz/${id}`)}>

      <h3>{title}</h3>

      <p>A quiz by {author}</p>

      <p>{!description ? 'No description' : description.length > 30 ? description.substring(0, 27) + '...' : description}</p>

      <p className='votes'>Votes: {votes}</p>

      <p className='questions'>Questions: {question_count}</p>

    </div>

  );

}

export default withRouter(QuizPreview);
