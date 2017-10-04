import './_profile-page.scss';
import React from 'react';
import {connect} from 'react-redux';

import ProfileForm from '../profile-form';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section id='profile-page'>
        <div className='blurred-image'></div>
        <ProfileForm/>
      </section>
    )
  }
}

export default ProfilePage;
