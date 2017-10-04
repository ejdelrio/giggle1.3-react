import './_auth-page.scss';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as util from '../../lib/util.js';
import * as authActions from '../../action/auth-action.js';
import AuthForm from '../auth-form';

class AuthPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let {login, signup, match, history} = this.props;
    let {auth} = match.params;
    let onComplete = auth === 'signup' ?
    signup:
    login;


    return(
      <section id='auth-page'>
        <div className='blurred-image'>
        </div>
        <AuthForm
          auth={auth}
          onComplete={onComplete}
          redirect={() => history.replace('/')}
        />
        <p><Link to='/'>⬅ Return To Homepage</Link></p>
      </section>
    )
  }
}

let mapDispatchToProps = dispatch => ({
  signup: user => dispatch(authActions.signupRequest(user)),
  login: user => dispatch(authActions.loginRequest(user))
})

export default connect(undefined, mapDispatchToProps)(AuthPage)
