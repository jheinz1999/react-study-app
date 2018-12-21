import React from 'react';
import moment from 'moment';

import config from '../config';

import './Comment.scss';

function Comment({commentData}) {

  const { author, author_img, created_at, text } = commentData;

  return (

    <div className='comment'>

      <div className='info'>

        <div className='img'>
          <img src={author_img ? author_img : config.default_img} />
        </div>

        <div className='info-content'>
          <p>By {author}</p>
          <p>{moment(created_at).fromNow()}</p>
        </div>

      </div>

      <div className='content'>

        <p>{text}</p>

      </div>

    </div>

  );

}

export default Comment;
