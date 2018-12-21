import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../redux/actions';
import Post from './Post';

function ForumPosts({posts, fetchPosts}) {

  const [fetched, setFetched] = useState(false);

  useEffect(() => {

    if (!fetched) {

      fetchPosts();
      setFetched(true);

    }

  }, [fetched]);

  if (!posts)
    return <Post loading />



  return (

    <>
      {posts.reverse().map((post, id) => <Post key={id} post={post} />)}
    </>

  );

}

function stateToProps(state) {

  return {

    posts: state.posts

  }

}

export default connect(stateToProps, { fetchPosts })(ForumPosts);
