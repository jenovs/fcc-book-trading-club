import React from 'react';

import Books from './Books';

export default class Home extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <div>
        <Books books={this.props.books} />
      </div>
    )
  }
}
