import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import * as util from '../../lib/util.js';
import AuthPage from '../auth-page';

class App extends React.Component {


  render() {
    return(
        <BrowserRouter>
          <section>
            <ul>
              <li><Link to='/signup'>Signup</Link></li>
            </ul>
            <Route path='*/:auth' component={AuthPage}/>
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
