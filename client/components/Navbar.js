import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
  render() {
    // console.log('Navbar props', this.props);
    const { user } = this.props;
    return (
      <div>
        <ul className="navbar">
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <span> {user && user.username}</span><br/>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        </ul>
      </div>
    )
  }
}
