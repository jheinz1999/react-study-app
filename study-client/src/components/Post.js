import React from 'react';
import moment from 'moment';

import './Post.scss';

function Post({post}) {

  const { title, body, created_at, author } = post;

  return (

    <div className='post'>

      <div>

        <h2>{title}</h2>
        <p>By {author}</p>

      </div>
      
      <p>{moment(created_at).fromNow()}</p>

    </div>

  );

}

export default Post;
