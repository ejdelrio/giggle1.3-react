import './_auth-form.scss';
import React from 'react';

import * as util from '../../lib/util.js';
import ErrorPopout from '../lib/error-popout';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      email: '',
      passWord: '',
      popoutToggle: false,
      errorMessage: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.errorToggle = this.errorToggle.bind(this);
    this.errorCheck = this.errorCheck.bind(this);
  }

  componentDidUpdate() {
    console.log('__AUTH_STATE__:', this.state);
  }

  errorToggle() {
    let popoutToggle = this.state.popoutToggle ? false: true;
    this.setState({popoutToggle: popoutToggle, errorMessage: ''})
  }

  onChange(e) {
    let {name, value} = e.target;

    this.setState({
      [name]: value,
    })
  }
  errorCheck(errorNum=200) {
    let {userName, passWord, email} = this.state;
    let {auth} = this.props;
    if(userName === '') return 'username is required';
    if(passWord === '') return 'password is required';
    if(email === '' && auth === 'signup') return 'email is required';
    if(errorNum === 401) return 'incorrect username or password!!!'
    if(errorNum === 400) return 'user name or email is already registered!!!'
    return undefined;
  }

  onSubmit(e) {
    e.preventDefault();
    let {modalClose, redirect} = this.props;

    let errorMessage = this.errorCheck();
    if(errorMessage) return this.setState({errorMessage, popoutToggle: true})

    this.props.onComplete(this.state)
    .then(() => {
      this.setState({
        userName: '',
        passWord: '',
        email: '',
        popoutToggle: false,
        errorMessage: '',
      });
      if(modalClose) modalClose();
      if(redirect) redirect();
    })
    .catch(error => {
      this.setState({
        errorMessage: this.errorCheck(error.status),
        popoutToggle: true
      });
    })
  }

  render() {
    let emailInput = (
      <input
        name='email'
        type='text'
        placeholder='Enter a valid email address'
        value={this.state.email}
        onChange={this.onChange}
      />
    )


    return (
      <form onSubmit={this.onSubmit} className='auth-form'>
        <ErrorPopout
          close={this.errorToggle}
          hidden={this.state.popoutToggle}
          text={this.state.errorMessage}
        />
        <input
          name='userName'
          type='text'
          value={this.state.userName}
          placeholder='Enter a valid user name'
          onChange={this.onChange}
        />
        <input
          name='passWord'
          type='password'
          value={this.state.passWord}
          placeholder='Enter a password'
          onChange={this.onChange}
        />
        {util.renderIf(this.props.auth === 'signup', emailInput)}
        <button type='submit'>➜</button>
      </form>
    );
  };
}

export default AuthForm;
