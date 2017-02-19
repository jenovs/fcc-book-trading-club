import React from 'react';
import { browserHistory } from 'react-router';

import Books from './Books';

export default class Profile extends React.Component {

  componentWillMount() {
    if (!this.props.user) {
      browserHistory.push('/');
    }
  }

  filterBooks() {
    return this.props.books.filter(book => {
      if (book._owner) return book._owner.username === this.props.user.username
    })
  }

  addBook(e) {
    e.nativeEvent.preventDefault();
    console.log(this.refs.author.value);
    console.log(this.refs.title.value);
    let author = this.refs.author.value;
    let title = this.refs.title.value;
    let coverUrl = this.refs.coverUrl.value;
    if (author && title) {
      this.refs.author.value = '';
      this.refs.title.value = '';
      this.refs.coverUrl.value = '';
      this.props.addBook(author, title, coverUrl);
    }
  }

  render() {
    // console.log('Profile, props', this.props);
    const books = this.filterBooks();
    // console.log(books);
    return (
      <div>
        <div>
          <form className="profile__form-add" onSubmit={this.addBook.bind(this)}>
            <fieldset>
              <legend>Add a book:</legend>
              <input ref='author' placeholder='author'/>{' '}
              <input ref='title' placeholder='title'/>{' '}
              <input ref='coverUrl' placeholder='cover Url' />{' '}
              <button type='submit'>Add</button>
            </fieldset>
          </form>
        </div>
        <div>
          <p>My Books</p>
          <Books books={books} deleteBook={this.props.deleteBook} user={this.props.user} showDelete={true}/>
        </div>
      </div>
    )
  }
}
