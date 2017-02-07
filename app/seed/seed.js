const mongoose = require('./../mongoose');
const Book = require('./../models/book');
const User = require('./../models/user');

const usersList = [
  {username: 'userOne'}
]

const booksList = [
  {
    author: 'Marcel Proust',
    title: 'In Search of Lost Time'
  }, {
    author: 'James Joyce',
    title: 'Ulysses'
  }
]

module.exports = function(done) {
  const { books, users } = mongoose.connection.collections;

  users.drop(() => {
    books.drop(() => {
      const user = new User(usersList[0]);
      const book0 = new Book(booksList[0]);
      book0.owner = user;
      const book1 = new Book(booksList[1]);
      book1.owner = user;
      user.books.push(book0, book1);
      Promise.all([user.save(), book0.save(), book1.save()])
      .then(() => done());
    });
  })
}
