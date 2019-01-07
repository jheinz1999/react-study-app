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
      selection: -1,
      numCorrect: 0,
      loadingNext: false,
      vote: 0,
      favorite: false

    }

  }

  setSelection = (id) => {

    this.setState({selection: id});

  }

  submit = (questionID, option) => {

    this.setState({loadingNext: true});

    axios.get(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}/questions/${questionID}/response?option=${option}`)
      .then(res => {
        console.log(res.data.correct);
        if (res.data.correct)
          this.setState({numCorrect: this.state.numCorrect + 1});
        this.setState({currentQuestion: this.state.currentQuestion + 1, selection: -1, loadingNext: false});
      })
      .catch(err => console.log(err));

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

    if (this.state.currentQuestion >= this.state.questions.length) {
      this.setState({gameState: 'FINISHED'});
      return;
    }

    const currentQuestion = this.state.questions[this.state.currentQuestion];

    const { id, question, options } = currentQuestion;

    return (

      <div className='question'>

        <div className='heading'>

          <h1>{question}</h1>

        </div>

        {options.map((option, index) => <QuizOption setSelection={this.setSelection} data={option} selected={index === this.state.selection} key={index} id={index} />)}

        <button onClick={() => this.submit(id, this.state.selection)} disabled={this.state.selection === -1 || this.state.loadingNext}>{this.state.loadingNext ? 'Loading...' : 'Submit!'}</button>

      </div>

    );

  }

  renderEndGame() {

    return (

      <div className='end-game'>

        <div className='heading'>

          <h1>Results</h1>

        </div>

        <div className='body'>

          <h2>Questions correct: {this.state.numCorrect} / {this.state.questions.length}</h2>

          <h3>Did you like this quiz?</h3>

          <i onClick={() => this.state.vote !== 1 ? this.setState({vote: 1}) : this.setState({vote: 0})} className={this.state.vote > 0 ? 'fa fa-thumbs-up' : 'far fa-thumbs-up'}></i>

          <i onClick={() => this.state.vote !== -1 ? this.setState({vote: -1}) : this.setState({vote: 0})} className={this.state.vote < 0 ? 'fa fa-thumbs-down' : 'far fa-thumbs-down'}></i>

          <p>If you really liked this quiz or would like to come back to it later, add it to your starred quizzes!</p>

          <i onClick={() => this.setState({favorited: !this.state.favorited})} className={this.state.favorited ? 'fa fa-star' : 'far fa-star'}></i>

          <br /><button onClick={() => this.props.history.push('/quizzes')}>Back to quizzes</button>

        </div>

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

          {gameState === 'FINISHED' && this.renderEndGame()}

        </div>

      </>

    );

  }

}

export default QuizView;
