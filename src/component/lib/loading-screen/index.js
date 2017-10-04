import './_loading_screen.scss';
import React from 'react';

class LoadingScreen extends React.Component {

  render() {
    return(
      <section className='loading-screen'>
      <p>{this.props.text}</p>
      <div id="outer">
        <div id="circleone"></div>
        <div id="circletwo"></div>
        <div id="circlethree"></div>
        <div id="cirlcefour"></div>
      </div>
      </section>
    )
  }
}

export default LoadingScreen
