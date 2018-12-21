// user dashboard views

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { TweenMax } from 'gsap/TweenMax';

import { updateUsrImg } from '../redux/actions';
import NavBar from '../components/NavBar';
import config from '../config';

import './DashboardView.scss';

function DashboardView({userData, updateUsrImg}) {

  if (!userData)
    return <h1>Loading...</h1>

  const { username, img_url } = userData.user;

  const [modal, showModal] = useState(false);
  const [imgInput, setImgInput] = useState('');
  const [imgGood, setImgGood] = useState(false);

  useEffect(() => {

    if (modal) {

      TweenMax.set('.change-bg', {display: 'block'});
      TweenMax.set('.change-image', {display: 'block'});
      TweenMax.to('.change-bg', 1, {opacity: 0.5});
      TweenMax.to('.change-image', 1, {opacity: 1, top: '50%'});

    }

    else {

      TweenMax.to('.change-bg', 1, {opacity: 0, onComplete: () => TweenMax.set('.change-bg', {display: 'none'})});
      TweenMax.to('.change-image', 1, {opacity: 0, top: '20%', onComplete: () => TweenMax.set('.change-image', {display: 'none'})});

    }

  }, [modal]);

  useEffect(() => checkImgLink(imgInput), [imgInput]);

  const handleImgChange = e => {

    setImgInput(e.target.value);

  }

  const checkImgLink = link => {

    let img = new Image();
    img.onload = () => setImgGood(true);
    img.onerror = () => setImgGood(false);
    img.src = link;

  }

  const submitForm = e => {

    e.preventDefault();

    updateUsrImg(imgInput);
    showModal(false);
    setImgInput('');

  }

  return (

    <>

      <NavBar />

      <div className='dashboard'>

        <h1>User Dashboard</h1>

        <h2>Logged in as: {username}</h2>

        <div className='profile-img-container'>
          <img src={img_url ? img_url : config.default_img} />
        </div>

        <button onClick={() => showModal(true)}>Update Profile Image</button>

      </div>

      <div className='change-bg'></div>

      <div className='change-image'>

        <span className='close-btn' onClick={() => showModal(false)}>X</span>

        <h3>Change profile picture:</h3>

        {imgGood ? <div className='profile-img-container'><img src={imgInput} /></div> : imgInput !== '' && <p>Invalid image link!</p>}

        <form onSubmit={submitForm}>

          <input type='text' value={imgInput} placeholder='image url' onChange={handleImgChange} required /><br/>
          <button disabled={!imgGood}>Submit!</button>

        </form>

      </div>

    </>

  );

}

function stateToProps(state) {

  return {

    userData: state.userData

  }

}

export default connect(stateToProps, { updateUsrImg })(DashboardView);
