// forum view

import React from 'react';

import NavBar from '../components/NavBar';
import ForumPosts from '../components/ForumPosts';

import './ForumView.scss';

function ForumView() {

  return (

    <>

      <NavBar />

      <div className='forum'>

        <div className='forum-header'>

          <h1>Forum</h1>

        </div>

        <div className='forum-posts'>

          <ForumPosts />

        </div>

      </div>

    </>

  );

}

export default ForumView;
