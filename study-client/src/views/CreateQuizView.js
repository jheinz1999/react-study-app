import React from 'react';
import axios from 'axios';

import NavBar from '../components/NavBar';

import './CreateQuizView.scss';

class CreateQuizView extends React.Component {

  constructor() {

    super();

    this.state = {

      topics: null,
      title: '',
      topic: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '1'

    }

  }

  componentDidMount() {

    axios.get('https://lambda-study-app.herokuapp.com/api/quizzes/topics')
      .then(res => this.setState({topics: res.data}))
      .catch(err => console.log(err));

  }

  handleChange = e => {

    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state));

  }

  handleSubmit = e => {

    e.preventDefault();

    const options = {

      headers: {

        Authorization: JSON.parse(localStorage.user).token

      }

    }

    axios.post('/api/quizzes', {
      title: this.state.title,
      topic: this.state.topic
    }, options)
      .then(res => {

        

      })

  }

  render() {

    return (

      <>

        <NavBar />

        <form onSubmit={this.handleSubmit} className='create-quiz-form'>

          <input type='text' name='title' placeholder='question' value={this.state.title} onChange={this.handleChange} required /><br/>

          <p>Topic: </p>

          <select name='topic' required>
            {this.state.topics && this.state.topics.map(topic => <option value={topic.name}>{topic.name}</option>)}
          </select>

          <br />

          <input type='radio' name='answer' value='1' required onChange={this.handleChange} />
          <input type='text' name='option1' placeholder='option 1 (required)' value={this.state.option1} onChange={this.handleChange} required />
          <br />
          <input type='radio' name='answer' value='2' required onChange={this.handleChange} />
          <input type='text' name='option2' placeholder='option 2 (required)' value={this.state.option2} onChange={this.handleChange} required /><br />
          <br />
          <input type='radio' name='answer' value='3' required onChange={this.handleChange} />
          <input type='text' name='option3' placeholder='option 3 (optional)' value={this.state.option3} onChange={this.handleChange} /><br />
          <br />
          <input type='radio' name='answer' value='4' required onChange={this.handleChange} />
          <input type='text' name='option4' placeholder='option 4 (optional)' value={this.state.option4} onChange={this.handleChange} /><br />
          <br />

          <button>Create Post!</button>

        </form>

      </>

    );

  }

}

export default CreateQuizView;
