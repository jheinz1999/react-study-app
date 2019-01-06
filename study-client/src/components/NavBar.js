import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../redux/actions';

import './NavBar.scss';

function NavBar({logout}) {

  function toggleLinks() {

    document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('visible'));

  }

  return (

    <nav className='navbar'>

      <NavLink className='nav-item' to='/dashboard'>Dashboard</NavLink>
      <NavLink className='nav-item' to='/board'>Forum</NavLink>
      <NavLink className='nav-item' to='/quizzes'>Quizzes</NavLink>
      <span className='nav-item' onClick={logout}>Log Out</span>
      <i className='nav-item fa fa-bars' onClick={() => toggleLinks()}></i>

    </nav>

  );

}

export default connect(null, { logout })(NavBar);
