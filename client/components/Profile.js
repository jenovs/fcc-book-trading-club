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
      if (book.owner) return book.owner.username === this.props.user
    })
  }

  addBook(e) {
    e.nativeEvent.preventDefault();
    console.log(this.refs.author.value);
    console.log(this.refs.title.value);
    let author = this.refs.author.value;
    let title = this.refs.title.value;
    if (author && title) {
      this.refs.author.value = '';
      this.refs.title.value = '';
      this.props.addBook(author, title);
    }
  }

  render() {
    // console.log('in render', this.props);
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
              <button type='submit'>Add</button>
            </fieldset>
          </form>
        </div>
        <div>
          <p>My Books</p>
          <Books books={books}/>
        </div>
      </div>
    )
  }
}
