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
    return <p>Loading post...</p>

  return (

    <>
      {posts.map(post => <Post post={post} />)}
    </>

  );

}

function stateToProps(state) {

  return {

    posts: state.posts

  }

}

export default connect(stateToProps, { fetchPosts })(ForumPosts);
