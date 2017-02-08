import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
  render() {
    // console.log('Navbar props', this.props);
    return (
      <div>
        Navbar component
        <span> {this.props.user}</span><br/>
        <Link to='/profile'>Profile</Link>
      </div>
    )
  }
}
