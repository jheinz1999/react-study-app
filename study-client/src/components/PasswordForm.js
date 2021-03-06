import React from 'react';
import { connect } from 'react-redux';

import { login, acknowledge, setLoginStatus, EMAIL, FAILURE } from '../redux/actions';

import './UsernameForm.scss';

class PasswordForm extends React.Component {

  constructor() {

    super();

    this.state = {

      password: '',
      showIncorrect: false,
      checking: false

    }

  }

  handleChange = e => {

    this.setState({

      [e.target.name]: e.target.value,
      showIncorrect: false

    })

  }

  handleSubmit = e => {

    e.preventDefault();

    this.setState({checking: true});
    this.props.login(this.props.email, this.state.password)

  }

  componentDidUpdate() {

    if (this.props.passwordStatus) {

      this.setState({checking: false});

      if (this.props.passwordStatus === FAILURE)
        this.setState({showIncorrect: true});

    }

    this.props.acknowledge();

  }

  render() {

    return (

      <form onSubmit={this.handleSubmit}>

        <input type='password' name='password' placeholder='password' value={this.state.password} onChange={this.handleChange} autoFocus required /><br/>
        {this.state.checking && <p>Authenticating...</p>}
        {this.state.showIncorrect && <p className='invalid'>Incorrect password!</p>}

        <div className='btns'>

          <span onClick={() => this.props.setLoginStatus(EMAIL)}>Go back</span>
          <button>Next</button>

        </div>

      </form>

    );

  }

}

function stateToProps(state) {

  return {

    email: state.email,
    passwordStatus: state.passwordStatus

  }

}

export default connect(stateToProps, { login, acknowledge, setLoginStatus })(PasswordForm);
