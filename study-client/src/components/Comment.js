import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import config from '../config';
import { deleteComment } from '../redux/actions';

import './Comment.scss';

function Comment({commentData, userData, deleteComment, isFirst}) {

  const { author, author_img, created_at, text, post_id, id } = commentData;

  console.log(post_id, id);

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

      {author === userData.user.username && !isFirst && <span className='fa fa-trash' onClick={() => deleteComment(post_id, id)}> Delete Comment</span>}

    </div>

  );

}

function stateToProps(state) {

  return {

    userData: state.userData

  }

}

export default connect(stateToProps, { deleteComment })(Comment);
