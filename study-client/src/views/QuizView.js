// quiz view

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavBar from '../components/NavBar';
import QuizOption from '../components/QuizOption';

import './QuizView.scss';

class QuizView extends React.Component {

  constructor() {

    super();

    this.state = {

      quiz: null,
      questions: null,
      gameState: 'PREVIEW',
      currentQuestion: 0,
      selection: -1

    }

  }

  setSelection = (id) => {

    this.setState({selection: id});

  }

  componentDidMount() {

    axios.get(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}`)
      .then(res => this.setState({quiz: res.data}))
      .catch(err => this.setState({quiz: 'error'}));

    axios.get(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}/questions`)
      .then(res => this.setState({questions: res.data}))
      .catch(err => this.setState({questions: 'error'}));

  }

  renderPreview() {

    const { title, votes, author, topic, question_count } = this.state.quiz;

    return (

      <div className='preview'>

        <h1>{title}</h1>

        <p>A quiz by {author.username}</p>

        <p>Topic: {topic}</p>

        <p>Number of questions: {question_count}</p>

        {this.state.questions ? this.state.questions !== 'error ' ? <button onClick={() => this.setState({gameState: 'PLAYING'})}>Start Quiz!</button> : <p>Quiz failed to load! Please refresh and try again.</p> : <p>Loading quiz...</p>}

      </div>

    )

  }

  renderQuestions() {

    const currentQuestion = this.state.questions[this.state.currentQuestion];

    const { id, question, options } = currentQuestion;

    return (

      <div className='question'>

        <div className='heading'>

          <h1>{question}</h1>

        </div>

        {options.map((option, index) => <QuizOption setSelection={this.setSelection} data={option} selected={index === this.state.selection} key={index} id={index} />)}

        <button disabled={this.state.selection === -1}>Submit!</button>

      </div>

    );

  }

  render() {

    const { history } = this.props;
    const { gameState, quiz } = this.state;

    if (!localStorage.user)
      history.push('/login');

    if (!quiz)
      return <h1>Loading...</h1>

    if (quiz === 'error')
      return <h1>Quiz not found!</h1>

    return (

      <>

        <NavBar />

        <div className='quiz'>

          {gameState === 'PREVIEW' && this.renderPreview()}

          {gameState === 'PLAYING' && this.renderQuestions()}

        </div>

      </>

    );

  }

}

export default QuizView;
