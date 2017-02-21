import React from 'react';

import Book from './Book';

export default class Books extends React.Component {

  parseBooks() {
    return this.props.books.map((book, i) => {
      return (
        <Book
          key={i}
          book={book}
          deleteBook={this.deleteBook.bind(this, book._id, book._owner.username)}
          createTradeRequest={this.createTradeRequest.bind(this, book._id)}
          deleteTradeRequest={this.deleteTradeRequest.bind(this, book._id)}
          confirmTradeRequest={this.confirmTradeRequest.bind(this, book._id)}
          showDelete={this.props.showDelete}
          user={this.props.user}
          requests={this.props.requests}
        />)
    });
  }

  deleteBook(id, username) {
    this.props.deleteBook && this.props.deleteBook(id, username);
  }

  createTradeRequest(id) {
    this.props.createTradeRequest(id);
  }

  deleteTradeRequest(id) {
    this.props.deleteTradeRequest(id);
  }

  confirmTradeRequest(id) {
    this.props.confirmTradeRequest(id);
  }

  render() {
    return (
        <div className="books__container">
          <br />
          {this.parseBooks()}
        </div>
    )
  }
}
