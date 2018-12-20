import React from 'react';
import { connect } from 'react-redux';

import { checkEmail, acknowledge, setLoginStatus, SUCCESS, FAILURE, SIGNUP, PASSWORD } from '../redux/actions';

import './UsernameForm.scss';

class UsernameForm extends React.Component {

  constructor() {

    super();

    this.state = {

      email: '',
      showFail: false,
      checkingEmail: false

    }

  }

  handleSubmit = e => {

    e.preventDefault();

    this.props.checkEmail(this.state.email);
    this.setState({checkingEmail: true});

  }

  handleChange = e => {

    this.setState({
      [e.target.name]: e.target.value,
      showFail: false
    });

  }

  componentDidUpdate() {

    if (this.props.emailStatus) {

      this.setState({checkingEmail: false});

      if (this.props.emailStatus === FAILURE)
        this.setState({showFail: true});

      if (this.props.emailStatus === SUCCESS)
        this.props.setLoginStatus(PASSWORD)

    }

    this.props.acknowledge();

  }

  render() {

    return (

      <form className='username-form' onSubmit={this.handleSubmit}>

        <input type='email' name='email' placeholder='email' value={this.state.email} onChange={this.handleChange} autoComplete='off' required /><br/>
        {this.state.checkingEmail && <p className='check'>Checking Email...</p>}
        {this.state.showFail && <p className='invalid'>Invalid email!</p>}

        <div className='btns'>

          <span className='signup' onClick={() => this.props.setLoginStatus(SIGNUP)}>Sign Up</span>
          <button>Next</button>

        </div>

      </form>

    );

  }


}

function stateToProps(state) {

  return {

    emailStatus: state.emailStatus

  }

}

export default connect(stateToProps, { checkEmail, acknowledge, setLoginStatus })(UsernameForm);
