import React from 'react';

import Books from './Books';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Books
          books={this.props.books}
          user={this.props.user}
          createTradeRequest={this.props.createTradeRequest}/>
      </div>
    )
  }
}
