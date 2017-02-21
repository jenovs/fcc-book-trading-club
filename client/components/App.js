import React from 'react';
import io from 'socket.io-client';

const socket = io();

import Navbar from './Navbar';
import Footer from './Footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      user: null,
      myRequests: [],
      requestedBooks: []
    }

    this.addBook = this.addBook.bind(this);
    this.createTradeRequest = this.createTradeRequest.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.filterMyRequests = this.filterMyRequests.bind(this);
    this.filterRequestedBooks = this.filterRequestedBooks.bind(this);
    this.deleteTradeRequest = this.deleteTradeRequest.bind(this);
    this.confirmTradeRequest = this.confirmTradeRequest.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentWillMount() {
    this.getBooks();
    this.getCurrentUser();
  }

  componentDidMount() {
    socket.on('update', () => {
      this.getBooks();
    })
  }

  getBooks() {
    fetch('/api/books')
    .then(res => res.json())
    .then(json => {
      this.setState({
        books: json
      }, () => {
        if (this.state.user) {
          this.filterMyRequests();
          this.filterRequestedBooks();
        }
      })
    })
    .catch(e => console.log(e));
  }

  addBook(author, title, coverUrl) {
    if (author && title) {
      const newBook = {
        author,
        title,
        coverUrl: coverUrl || ''
      }

      fetch(`/api/books`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(newBook)
      })
      .then(res => res.json())
      .then(() => {
        this.getBooks();
      })
    }
  }

  deleteBook(id, username) {
    const { user } = this.state
    if (user && user.username === username) {
      fetch(`/api/books/${id}`, {
        credentials: 'include',
        method: 'DELETE',
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
    fetch(`/api/trades/${id}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    .then(() => this.getBooks())
  }

  getCurrentUser() {
    fetch('/api/users', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        user: {
          username: json.username,
          _id: json._id,
          requestedBooks: json.requestedBooks,
          fullName: json.fullName,
          city: json.city,
          state: json.state
        }
      }, () => {
        this.filterMyRequests();
        this.filterRequestedBooks();
      });
    })
    .catch(e => e)
  }

  updateUser(data) {
    fetch(`/api/users/`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    })
    .then(() => {
      this.getCurrentUser();
    })
    .catch(e => console.log(e));
  }

  filterMyRequests() {
    const { books, user } = this.state;
    const myRequests = books.filter(book => book._requestedBy === user._id)
    this.setState({
      myRequests
    })
  }

  filterRequestedBooks() {
    const { books, user } = this.state;
    const requestedBooks = books.filter(book => {
      return book._requestedBy && book._requestedBy !== user._id && book._owner._id === user._id
    });

    this.setState({
      requestedBooks
    })
  }

  deleteTradeRequest(id) {
    fetch(`/api/trades/${id}`, {
      credentials: 'include',
      method: 'DELETE'
    })
    .then(() => this.getBooks())
    .catch(e => console.log(e))
  }

  confirmTradeRequest(id) {
    fetch(`/api/trades/${id}`, {
      credentials: 'include',
      method: 'PUT'
    })
    .then(() => this.getBooks())
    .catch(e => console.log(e))
  }

  render() {
    const props = {
      books: this.state.books,
      user: this.state.user,
      addBook: this.addBook,
      deleteBook: this.deleteBook,
      createTradeRequest: this.createTradeRequest,
      myRequests: this.state.myRequests,
      requestedBooks: this.state.requestedBooks,
      deleteTradeRequest: this.deleteTradeRequest,
      confirmTradeRequest: this.confirmTradeRequest,
      updateUser: this.updateUser
    };
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));
    return (
      <div className="app__container">
        <Navbar
          user={this.state.user}
          totalRequests={this.state.requestedBooks.length + this.state.myRequests.length} />
        <div className="app__content">
          {childrenWithProps}
        </div>
        <Footer />
      </div>
    )
  }
}
