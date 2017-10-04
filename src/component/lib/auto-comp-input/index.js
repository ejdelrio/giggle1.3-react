import React from 'react';

class AutoCompInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResults: [],
      textInput: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    let {Tree, library} = this.props;
    this.genreLibrary = new Tree();
    this.genreLibrary.loadLibrary(library);
  }
  componentDidMount() {
    console.log(this.genreLibrary);
  }

  onChange(e) {
    let {name, value} = e.target;
    let queryResults = value.length > 0 ?  this.genreLibrary.searchWords(value): [];
    this.setState({
      [name]: value,
      queryResults
    })
  }

  render() {
    return(
      <div id={this.props.className}>
        <input
          type='text'
          name='textInput'
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          value={this.state.textInput}
          autoComplete='off'
        />
        <ul>
          {this.state.queryResults.map((item, ind) => {
            return(
              <li key={ind} onClick={() => this.props.onComplete(item)}>
                {this.props.element(item)}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default AutoCompInput
