import './_profile-photo-upload.scss';
import React from 'react';

import Modal from '../../lib/modal';
import ErrorPopout from '../../lib/error-popout';
import * as util from '../../../lib/util.js';

class ProfilePhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      preview: '',
      errorMessage: null,
      errorBoolean: false
    }
  }

  render() {
    return(
      <section className={this.props.className}>
        <div>
          <img src={this.state.preview}/>
        </div>
        <input
          type='file'
          name='preview'
          value={this.state.preview}
        />
      </section>
    )
  }
}

export default ProfilePhotoUpload;
