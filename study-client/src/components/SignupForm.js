import React from 'react';
import { connect } from 'react-redux';

import { signUp, acknowledge, SUCCESS, FAILURE } from '../redux/actions';

class SignupForm extends React.Component {

  constructor() {

    super();

    this.state = {

      username: '',
      email: '',
      password: '',
      password2: '',
      showFail: false,
      signingUp: false

    }

  }

  handleChange = e => {

    this.setState({

      [e.target.name]: e.target.value,
      showFail: false

    });

  }

  handleSubmit = e => {

    e.preventDefault();

    this.setState({})
    this.props.signUp(this.state.username, this.state.email, this.state.password);

  }

  componentDidUpdate() {

    if (this.props.signupStatus) {

      this.setState({signingUp: false});

      if (this.props.signupStatus === FAILURE)
        this.setState({showFail: true});

    }

    this.props.acknowledge();

  }

  render() {

    return (

      <form onSubmit={this.handleSubmit}>

        <input type='text' name='username' placeholder='username' value={this.state.username} onChange={this.handleChange} required />
        <input type='email' name='email' placeholder='email' value={this.state.email} onChange={this.handleChange} required />
        <input type='password' name='password' placeholder='password' value={this.state.password} onChange={this.handleChange} required />
        <input type='password' name='password2' placeholder='password' value={this.state.password2} onChange={this.handleChange} required />

        {this.state.password === this.state.password2 ? <span className='match'>{this.state.password !== '' && 'Passwords match!'}</span> : <span className='fail'>Passwords do not match.</span>}

        <button disabled={this.state.password === '' || this.state.password !== this.state.password2 || this.state.username === '' || this.state.email === ''}>Sign up!</button>

        {this.state.signingUp && <p>Signing up...</p>}
        {this.state.showFail && <p>Sign up failed! Try again with a different email or username.</p>}

      </form>

    );

  }

}

function stateToProps(state) {

  return {

    signupStatus: state.signupStatus

  }

}

export default connect(stateToProps, { signUp, acknowledge })(SignupForm);
