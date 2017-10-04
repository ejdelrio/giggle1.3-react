import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import * as util from '../../lib/util.js';
import AuthPage from '../auth-page';
import ProfilePage from '../profile-comps/profile-page';

class App extends React.Component {

  render() {
    return(
        <BrowserRouter>
          <section>
            <ul>
              <li><Link to='home/signup'>Signup</Link></li>
              <li><Link to='home/login'>Login</Link></li>
              <li><Link to='/profile'>Profile</Link></li>
            </ul>
            <Route path='/home/:auth' component={AuthPage}/>
            <Route path='/profile' component={ProfilePage}/>
          </section>
        </BrowserRouter>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  token: state.token
});

export default connect(mapStateToProps, undefined)(App);
