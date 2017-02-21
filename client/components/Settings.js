import React from 'react';
import { browserHistory } from 'react-router';

export default class Settings extends React.Component {

  constructor(props) {
    super(props);

    if (this.props.user) {
      this.state = {
        fullName: this.props.user.fullName || '',
        city: this.props.user.city || '',
        state: this.props.user.state || '',
        editing: false
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
    this.setState({
      editing: false
    })
  }

  handleChange(e) {
    this.setState({
      [e.nativeEvent.target.name]: e.nativeEvent.target.value
    })
  }

  setEdit() {
    this.setState({
      editing: true
    })
  }

  render() {
    // console.log('Settings, state', this.state);
    return (
      this.state && (
        <div className="settings__container">

          {!this.state.editing && (<div>
            <span>Username: </span>{this.props.user.username}<br/>
            <span>Full name: </span>{this.state.fullName}<br/>
            <span>City: </span>{this.state.city}<br/>
            <span>State: </span>{this.state.state}<br/>
            <button onClick={this.setEdit.bind(this)}>Edit</button>
          </div>)}

          {this.state.editing && (
            <form onSubmit={this.updateUser} onChange={this.handleChange}>
              <span>Username: </span>{this.props.user.username}
              <div>
                <label htmlFor="fullName">Full name: </label>
                <input type="text" name="fullName" value={this.state.fullName} onChange={f => f} autoFocus/>
              </div>
              <div>
                <label htmlFor="city">City: </label>
                <input type="text" name="city" value={this.state.city} onChange={f => f} />
              </div>
              <div>
                <label htmlFor="state">State: </label>
                <input type="text" name="state" value={this.state.state} onChange={f => f} />
              </div>
              <button type="Submit">Save</button>
            </form>
          )}
        </div>
      )
    )
  }
}
