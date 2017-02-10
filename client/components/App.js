import React from 'react';

import Navbar from './Navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      user: null
    }

    this.addBook = this.addBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  componentWillMount() {
    this.getBooks();
    this.getCurrentUser();
  }

  getBooks() {
    fetch('/books')
      .then(res => res.json())
      .then(json => {
        this.setState({books: json})
      })
  }

  addBook(author, title) {
    if (author && title) {
      const newBook = {
        author,
        title
      }

      fetch(`/books`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(newBook)
      })
      .then(res => res.json())
      .then(json => {
        console.log('addBook json', json);
        this.setState({
          books: this.state.books.concat(json[0])
        })
      })
    }
  }

  deleteBook(id, username) {
    if (this.state.user && this.state.user === username) {
      console.log('deleting book', id, username);
      fetch(`/books/${id}`, {
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        method: 'DELETE',
        // body: JSON.stringify(newBook)
      })
        .then(res => res.json())
        .then(json => {
          const bookInd = this.state.books.findIndex(book => book._id === json._id)
          const books = [...this.state.books]
          books.splice(bookInd, 1)
          this.setState({
            books
          })
        })
    }
  }

  getCurrentUser() {
    fetch('/users')
      .then(res => res.json())
      .then(json => {
        this.setState({user: json.username})
      })
  }

  render() {
    const props = {
      books: this.state.books,
      user: this.state.user,
      addBook: this.addBook,
      deleteBook: this.deleteBook
    };
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));
    return (
      <div>
        <Navbar user={this.state.user} />
        {childrenWithProps}
      </div>
    )
  }
}
