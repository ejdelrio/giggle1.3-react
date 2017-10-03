import './error-popout.scss';
import React from 'react';

class ErrorPopout extends React.Component {

  render() {
    let className = this.props.hidden ?
    'error': 'hidden-error';
    console.log('CLASS', className)
    return(
      <div className={className}>
        <div>
          <p>Error</p>
          <button type='button' onClick={this.props.close}>X</button>
        </div>
        <p>{this.props.text}</p>
      </div>
    )
  }
}

export default ErrorPopout;
