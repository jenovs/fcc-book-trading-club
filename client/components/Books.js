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
          deleteBook={this.deleteBook.bind(this, book._id, book.owner.username)}
          deleteButton={this.props.user}/>)
    });
  }

  deleteBook(id, username) {
    this.props.deleteBook && this.props.deleteBook(id, username);
  }

  render() {
    return (
      <div style={container}>
        {this.parseBooks()}
      </div>
    )
  }
}
