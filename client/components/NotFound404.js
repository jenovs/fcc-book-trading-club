import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

// const NotFound404 = (props) => (
//   <div>
//     <p>Page not found</p>
//     <Link to='/'>Home</Link>
//   </div>
// );
export default class NotFound404 extends React.Component {
  componentWillMount() {
    console.log(browserHistory);
    browserHistory.push('/');
  }
  render() {
    return (
      <div></div>
    )
  }
}

// export default NotFound404;
