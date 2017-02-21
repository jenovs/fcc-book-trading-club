import React from 'react';
import { browserHistory } from 'react-router';

import Books from './Books';

export default class Requests extends React.Component {

  componentWillMount() {
    if (!this.props.user) {
      browserHistory.push('/');
    }
  }

  render() {
    console.log('Requests, props', this.props);
    return (
      <div>
        <div className="requests__title">Requests</div>
        My requests: {this.props.myRequests.length}
        <Books
          books={this.props.myRequests}
          deleteTradeRequest={this.props.deleteTradeRequest}
          requests={true}
          user={this.props.user}
        />
        <br/>
        Requested books: {this.props.requestedBooks.length}
        <Books
          books={this.props.requestedBooks}
          deleteTradeRequest={this.props.deleteTradeRequest}
          confirmTradeRequest={this.props.confirmTradeRequest}
          requests={true}
          user={this.props.user}
        />
      </div>
    )
  }
}
