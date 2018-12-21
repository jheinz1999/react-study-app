import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Comment from '../components/Comment';
import NavBar from '../components/NavBar';

import './PostView.scss';

function PostView({match}) {

  const [post, setPost] = useState(null);
  const [postLoaded, setPostLoaded] = useState(false);
  const [invalidPost, setInvalidPost] = useState(false);
  const [comments, setComments] = useState(null);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

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

  const loading = {
    author: {
      username: 'loading...',
      img_url: null
    },
    body: 'null',
    title: null,
    created_at: null
  };

  const { author, body, title, created_at } = post ? post : loading;

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

        </div>

        {post && <Comment commentData={op} />}
        {post && commentsLoaded && comments.map((comment, id) => <Comment commentData={comment} key={id} />)}

      </div>

    </>

  );

}

export default PostView;
