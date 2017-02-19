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
    this.createTradeRequest = this.createTradeRequest.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  componentWillMount() {
    this.getBooks();
    this.getCurrentUser();
  }

  getBooks() {
    fetch('/api/books')
    .then(res => res.json())
    .then(json => {
      this.setState({books: json})
    })
    .catch(e => console.log(e));
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

  createTradeRequest(id) {
    console.log('Requesting the book', id);
    fetch(`/api/trades/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-test-user': this.state.user.username
      },
      method: 'POST'
    })
  }

  // getCurrentUser() {
  //   this.setState({
  //     user: 'userOne'
  //   })
  // }
  getCurrentUser() {
    fetch('/api/users', {
      headers: {
        'x-test-user': 'userOne'
      },
    })
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState({
          user: {
            username: json.username,
            _id: json._id,
            requestedBooks: json.requestedBooks
          }
        });
      })
  }

  render() {
    // console.log('App state', this.state);
    const props = {
      books: this.state.books,
      user: this.state.user,
      addBook: this.addBook,
      deleteBook: this.deleteBook,
      createTradeRequest: this.createTradeRequest
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
