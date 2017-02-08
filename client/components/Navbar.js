import React from 'react';

export default class Navbar extends React.Component {
  render() {
    console.log('Navbar props', this.props);
    return (
      <div>
        Navbar component
        <span> {this.props.user}</span>
      </div>
    )
  }
}
