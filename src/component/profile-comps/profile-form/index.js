import './_profile-form.scss';
import React from 'react';
import {connect} from 'react-redux';

import * as profileActions from '../../../action/profile-action.js';
import * as googleTools from '../../../lib/googleTools.js';
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
      coords: [],
      genres: [],
      bio: '',
      errorBoolean: false,
      errorMessage: '',
      ...this.props.profile
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addGenre = this.addGenre.bind(this);
    this.removeGenre = this.removeGenre.bind(this);
    this.errorCheck = this.errorCheck.bind(this);
    this.errorToggle = this.errorToggle.bind(this);
    this.useLocation = this.useLocation.bind(this);
    this.useAddress = this.useAddress.bind(this);
  }

  errorToggle() {
    let errorBoolean = this.state.errorBoolean ?
    false : true;
    this.setState({errorBoolean});
  }

  errorCheck(err) {
    let status = err ? err.status : '';
    let {state} = this;
    let required = ['bio', 'state', 'city', 'address'];

    for (let i = 0; i < required.length; i++) {
      if(state[required[i]] === '') return `${required[i]} is required!!`;
    }
    if(status === 401) return 'Looks like you don\'t have an account. Please create one first';
    if(status === 401) return 'Something went wrong! Please try your request again.';
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

    this.useAddress()
    .then(coords => {
      let query = this.state;
      query.coords = coords;
      return this.props.onComplete(query);
    })
    .then(() => this.props.redirect())
    .catch(error => {
      let errorMessage = this.errorCheck(error);
      this.setState({errorMessage, errorBoolean: true});
    })
  }

  onChange(e) {
    let {name, value} = e.target;
    this.setState({[name]: value})
  }

  useLocation() {
    googleTools.geoCall()
    .then(coords => {
      return googleTools.getAddress(coords);
    })
    .then(loc => {
      let newState = googleTools.formatAddress(loc.results, loc.coords);
      this.setState(newState)
    });
  }

  useAddress() {
    return new Promise(resolve => {
      if(this.state.coords.length > 1) return resolve(this.state.coords);
      resolve(googleTools.getCoords(this.state));
    })
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
          placeholder='Enter Street Address'
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
        <button type='button' onClick={this.useLocation}>Use My Location</button>
      </form>
    )
  }
}

export default ProfileForm;
