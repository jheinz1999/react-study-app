import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {

  return (

    <nav>

      <NavLink to='/dashboard'>Dashboard</NavLink>
      <NavLink to='/board'>Forum</NavLink>
      <NavLink to='/quizzes'>Quizzes</NavLink>

    </nav>

  );

}

export default NavBar;
