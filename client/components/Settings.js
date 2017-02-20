import React from 'react';
import { browserHistory } from 'react-router';

export default class Settings extends React.Component {

  constructor(props) {
    super(props);

    if (this.props.user) {
      this.state = {
        fullName: this.props.user.fullName || '',
        city: this.props.user.city || '',
        state: this.props.user.state || ''
      }
    }


    this.updateUser = this.updateUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (!this.props.user) {
      browserHistory.push('/');
    }
  }

  updateUser(e) {
    e.nativeEvent.preventDefault();
    this.props.updateUser(this.state);
  }

  handleChange(e) {
    // console.log(e.nativeEvent);
    this.setState({
      [e.nativeEvent.target.name]: e.nativeEvent.target.value
    })
  }

  render() {
    // console.log('Settings, state', this.state);
    return (
      this.state && (
        <div>Settings
          <form onSubmit={this.updateUser} onChange={this.handleChange}>
            <input type="text" name="fullName" value={this.state.fullName} onChange={f => f} autoFocus/>
            <input type="text" name="city" value={this.state.city} onChange={f => f} />
            <input type="text" name="state" value={this.state.state} onChange={f => f} />
            <button type="Submit">Save</button>
          </form>
        </div>
      )
    )
  }
}
