import React from 'react';
import { browserHistory } from 'react-router';

export default class Profile extends React.Component {
  componentWillMount() {
    // if (!this.props) {
    //   browserHistory.push('/');
    // }
    console.log('Profile props user', this.props.user);
  }

  render() {
    return (
      <div>Profile component</div>
    )
  }
}
