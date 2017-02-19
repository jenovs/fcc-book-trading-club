import React from 'react';

import Book from './Book';

const container = {
  display: 'flex',
  flexWrap: 'wrap'
  // flex: '0 1 33%'
}

export default class Books extends React.Component {

  parseBooks() {
    return this.props.books.map((book, i) => {
      return (
        <Book
          key={i}
          book={book}
          deleteBook={this.deleteBook.bind(this, book._id, book._owner.username)}
          createTradeRequest={this.createTradeRequest.bind(this, book._id)}
          user={this.props.user}
        />)
    });
  }

  deleteBook(id, username) {
    this.props.deleteBook && this.props.deleteBook(id, username);
  }

  createTradeRequest(id) {
    this.props.createTradeRequest(id);
  }

  render() {
    // console.log('Books props', this.props);
    return (
      <div style={container}>
        {this.parseBooks()}
      </div>
    )
  }
}
