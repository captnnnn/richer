import React from 'react';
import ReactDOM from 'react-dom';

const mountNode = window.document.getElementById('appRoot');
class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReactDOM.render(<HelloMessage name="Jane" />, mountNode);
