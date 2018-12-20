import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../redux/actions';

import './NavBar.scss';

function NavBar({logout}) {

  return (

    <nav className='navbar'>

      <NavLink className='nav-item' to='/dashboard'>Dashboard</NavLink>
      <NavLink className='nav-item' to='/board'>Forum</NavLink>
      <NavLink className='nav-item' to='/quizzes'>Quizzes</NavLink>
      <span className='nav-item' onClick={() => logout()}>Log Out</span>

    </nav>

  );

}

export default connect(null, { logout })(NavBar);
