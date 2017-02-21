import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
  render() {
    // console.log('Navbar props', this.props);
    const { user, totalRequests } = this.props;
    return (
      <div>
        <ul className="navbar">
          <li>
            {user && <Link to='/'>All Books</Link>}
          </li>
          <li>
            {!user && <a href="/auth/twitter">Login to request a trade</a>}
          </li>
          <li>
            {user && <Link to='/requests'>Requests ({totalRequests})</Link>}
          </li>
          <li>
            {user && <Link to='/profile'>My Books</Link>}
          </li>
          <li>
            {user && <Link to='/settings'>{user.username}</Link>}
          </li>
          <li>
            {user && <a href="/auth/logout">Logout</a>}
          </li>
        </ul>
      </div>
    )
  }
}
