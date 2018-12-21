import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Comment from '../components/Comment';
import NavBar from '../components/NavBar';
import { deletePost, acknowledge, addComment, SUCCESS, FAILURE } from '../redux/actions';

import './PostView.scss';

function PostView({match, history, userData, deletePost, deleteStatus, commentDeleted, commentStatus, addComment, acknowledge}) {

  const [post, setPost] = useState(null);
  const [postLoaded, setPostLoaded] = useState(false);
  const [invalidPost, setInvalidPost] = useState(false);
  const [comments, setComments] = useState(null);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [comment, setComment] = useState('');

  const handleChange = e => {

    setComment(e.target.value);

  }

  const handleSubmit = e => {

    e.preventDefault();

    addComment(match.params.id, comment);

  }

  useEffect(() => {

    axios.get(`https://lambda-study-app.herokuapp.com/api/posts/${match.params.id}`)
      .then(res => {
        setPost(res.data);
        setPostLoaded(true);
      })
      .catch(err => {
        setInvalidPost(true);
        setPostLoaded(true);
      });

  }, [postLoaded]);

  useEffect(() => {

    axios.get(`https://lambda-study-app.herokuapp.com/api/posts/${match.params.id}/comments`)
      .then(res => {
        setComments(res.data);
        setCommentsLoaded(true);
      })
      .catch(err => console.log(err));

  }, [commentsLoaded]);

  useEffect(() => {

    if (deleteStatus && deleteStatus === SUCCESS) {

      acknowledge();
      history.push('/board');

    }

  }, [deleteStatus]);

  useEffect(() => {

    if (commentStatus && commentStatus === SUCCESS) {

      acknowledge();
      setComment('');
      setCommentsLoaded(false);

    }

  }, [commentStatus]);

  useEffect(() => {

    if (commentDeleted !== null && commentDeleted) {

      acknowledge();
      setCommentsLoaded(false);

    }

  }, [commentDeleted]);

  const loading = {
    author: {
      username: 'loading...',
      img_url: null
    },
    body: 'null',
    title: null,
    created_at: null
  };

  const { author, body, title, created_at, id } = post ? post : loading;

  const op = {
    text: body,
    author: author.username,
    author_img: author.img_url,
    created_at: created_at
  }

  return (

    <>

      <NavBar />

      <div className='post-view'>

        <div className='post-header'>

          <h1>{post ? title : 'Loading Post...'}</h1>
          {post && post.author.username === userData.user.username && <span className='fa fa-trash' onClick={() => deletePost(id)}>Delete Post!</span>}

        </div>

        {post && <Comment commentData={op} />}
        {post && commentsLoaded && comments.map((comment, id) => <Comment commentData={comment} key={id} />)}

        <form className='comment-form' onSubmit={handleSubmit}>

          <textarea name='comment' placeholder='add comment...' value={comment} onChange={handleChange} rows='4' /><br/>
          <button>Add Comment!</button>

        </form>

      </div>

    </>

  );

}

function stateToProps(state) {

  return {

    userData: state.userData,
    deleteStatus: state.deleteStatus,
    commentStatus: state.commentStatus,
    commentDeleted: state.commentDeleted

  }

}

export default connect(stateToProps, { deletePost, acknowledge, addComment })(PostView);
