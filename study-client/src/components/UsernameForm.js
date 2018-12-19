import React from 'react';
import { connect } from 'react-redux';

import { checkEmail, acknowledge, setLoginStatus, SUCCESS, FAILURE, SIGNUP, PASSWORD } from '../redux/actions';

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

      <form onSubmit={this.handleSubmit}>

        <input type='email' name='email' placeholder='email' value={this.state.email} onChange={this.handleChange} />
        {this.state.checkingEmail && <p>Checking Email...</p>}
        {this.state.showFail && <p>Invalid email!</p>}
        <span className='signup' onClick={() => this.props.setLoginStatus(SIGNUP)}>Sign Up</span>
        <button>Next</button>

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
