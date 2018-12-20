import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import './Post.scss';

function Post({post, history}) {

  const { id, title, created_at, author } = post;

  return (

    <div className='post' onClick={() => history.push(`/post/${id}`)}>

      <div>

        <h2>{title}</h2>
        <p>By {author}</p>

      </div>

      <p>{moment(created_at).fromNow()}</p>

    </div>

  );

}

export default withRouter(Post);
