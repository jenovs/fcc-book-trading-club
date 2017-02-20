import React from 'react';
import { browserHistory } from 'react-router';

import Books from './Books';
import Button from './Button';

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
              <div>
                <label htmlFor="author">Author: </label>
                <input ref='author' name="author" placeholder='author'/>
              </div>
              <div>
                <label htmlFor="title">Title: </label>
                <input ref='title' name="title" placeholder='title'/>
              </div>
              <div>
                <label htmlFor="coverUrl">Cover&nbsp;URL: </label>
                <input ref='coverUrl' name="coverUrl" placeholder='cover Url' />
              </div>
              <div>
                <button type='submit'>Add</button>
              </div>
            </fieldset>
          </form>
        </div>
        <div>
          <p>My Books ({books.length})</p>
          <Books books={books} deleteBook={this.props.deleteBook} user={this.props.user} showDelete={true}/>
        </div>
      </div>
    )
  }
}
