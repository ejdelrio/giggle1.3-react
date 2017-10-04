import './_profile-form.scss';
import React from 'react';
import {connect} from 'react-redux';
import profileActions from '../../../action/profile-action.js';

import AutoCompleteTree from '../../../lib/triadAutoComplete.js';
import musicLibrary from '../../../lib/musicGenreLibrary.js';
import * as util from '../../../lib/util.js';
import AutoCompInput from '../../lib/auto-comp-input'
import ErrorPopout from '../../lib/error-popout';

let listElement = val => {
  return(
    <p>{val}<span>Add Genre</span></p>
  )
}


class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'band',
      address: '',
      state: '',
      city: '',
      location: [],
      genres: [],
      bio: '',
      errorBoolean: false,
      errorMessage: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addGenre = this.addGenre.bind(this);
    this.removeGenre = this.removeGenre.bind(this);
    this.errorCheck = this.errorCheck.bind(this);
    this.errorToggle = this.errorToggle.bind(this);
  }

  errorToggle() {
    let errorBoolean = this.state.errorBoolean ?
    false : true;
    this.setState({errorBoolean});
  }

  errorCheck(err) {
    let {state} = this;
    let required = ['bio', 'state', 'city', 'address'];
    for (let i = 0; i < required.length; i++) {
      if(state[required[i]] === '') return `${required[i]} is required!!`;
    }
  }


  addGenre(genre) {
    let {genres} = this.state;
    if(genres.includes(genre)) return;
    genres.push(genre);
    this.setState({genres})
  }

  removeGenre(ind) {
    let {genres} = this.state;
    genres.splice(ind, 1);
    this.setState({genres});
  }

  onSubmit(e) {
    e.preventDefault();
    let errorMessage = this.errorCheck();
    if(errorMessage) return this.setState({errorMessage, errorBoolean: true});
  }

  onChange(e) {
    let {name, value} = e.target;
    this.setState({[name]: value})
  }


  render() {
    return(
      <form className='profile-form' onSubmit={this.onSubmit}>
        <ErrorPopout
          text={this.state.errorMessage}
          hidden={this.state.errorBoolean}
          close={this.errorToggle}
        />

        <select
          name='type'
          onChange={this.onChange}
          placeholder='Select Profile Type'
        >
          <option name='band' value='band'>Band</option>
          <option name='venue' value='venue'>Venue</option>
        </select>
        <ul>
          {this.state.genres.map((genre, ind) => {
            return(
              <li key={ind}>
                <p>
                  {genre}
                  <span onClick={() => this.removeGenre(ind)}>X</span>
                </p>
              </li>
            )
          })}
        </ul>
        <AutoCompInput
          placeholder='Enter a Genre'
          Tree={AutoCompleteTree}
          library={musicLibrary}
          onComplete={this.addGenre}
          className='genre-auto-comp'
          element={listElement}
        />
        <input
          name='address'
          type='text'
          placeholder='Enter Street Adress'
          onChange={this.onChange}
          value={this.state.address}
        />
        <input
          name='state'
          type='text'
          placeholder='Enter State'
          onChange={this.onChange}
          value={this.state.state}
        />
        <input
          name='city'
          type='text'
          placeholder='Enter City'
          onChange={this.onChange}
          value={this.state.city}
        />
        <textarea
          type='text'
          name='bio'
          placeholder='Enter a Short Bio'
          onChange={this.onChange}
          value={this.state.bio}
        />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

let mapStateToProps = state => ({
  token: state.token,
  profile: state.profile
})

let mapDispatchToProps = dispatch => ({
  postProfile: profile => dispatch(profileActions.postProfile(profile)),
})

export default connect(undefined, mapDispatchToProps)(ProfileForm);
