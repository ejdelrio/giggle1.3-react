import './_modal.scss';
import React from 'react';

class Modal extends React.Component {

  render() {
    return(
      <section class='modal'>
        <button onClick={this.props.close}>X</button>
        {this.props.children}
      </section>
    )
  }
}

export default Modal;
