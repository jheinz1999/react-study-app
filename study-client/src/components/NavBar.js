import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../redux/actions';

function NavBar({logout}) {

  return (

    <nav>

      <NavLink to='/dashboard'>Dashboard</NavLink>
      <NavLink to='/board'>Forum</NavLink>
      <NavLink to='/quizzes'>Quizzes</NavLink>
      <span onClick={() => logout()}>Log Out</span>

    </nav>

  );

}

export default connect(null, { logout })(NavBar);
