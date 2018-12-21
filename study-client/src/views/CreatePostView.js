import React from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/NavBar';
import { addPost, acknowledge, SUCCESS, FAILURE } from '../redux/actions';

import './CreatePostView.scss';

class CreatePostView extends React.Component {

  constructor() {

    super();

    this.state = {

      title: '',
      body: '',
      showFail: false

    }

  }

  handleChange = e => {

    this.setState({

      [e.target.name]: e.target.value

    });

  }

  handleSubmit = e => {

    e.preventDefault();

    this.props.addPost({
      title: this.state.title,
      body: this.state.body
    });

  }

  componentDidUpdate(prevProps) {

    if (this.props.addStatus !== prevProps.addStatus) {

      if (this.props.addStatus === SUCCESS) {

        this.props.history.push('/dashboard');

      }

      else if (this.props.addStatus === FAILURE) {

        this.setState({showFail: true});

      }

      this.props.acknowledge();

    }

  }

  render() {

    return (

      <>

        <NavBar />

        <form className='create-post-form' onSubmit={this.handleSubmit}>

          <input type='text' name='title' placeholder='title' value={this.state.title} onChange={this.handleChange} required /><br/>
          <textarea rows='10' name='body' placeholder='content' value={this.state.body} onChange={this.handleChange} required /><br/>

          {this.state.showFail && <p>The request to create this post failed.</p>}

          <button>Create Post!</button>

        </form>

      </>

    );

  }

}

function stateToProps(state) {

  return {

    addStatus: state.addStatus

  }

}

export default connect(stateToProps, { addPost, acknowledge })(CreatePostView);
