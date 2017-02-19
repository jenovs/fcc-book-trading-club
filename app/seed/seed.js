const { ObjectID } = require('mongodb');
const mongoose = require('./../mongoose');
const Book = require('./../models/book');
const User = require('./../models/user');

const user0Id = new ObjectID();
const user1Id = new ObjectID();

const book0Id = new ObjectID();
const book1Id = new ObjectID();
const book2Id = new ObjectID();
const book3Id = new ObjectID();

const usersList = [
  {
    _id: user0Id,
    username: 'Jane',
    books: [],
    requestedBooks: [book3Id]
  }, {
    _id: user1Id,
    username: 'John',
    books: []
  }
];

const booksList = [
  {
    _id: book0Id,
    author: 'Marcel Proust',
    title: 'In Search of Lost Time',
    _owner: user0Id
  }, {
    _id: book1Id,
    author: 'James Joyce',
    title: 'Ulysses',
    _owner: user0Id
  }, {
    _id: book2Id,
    author: 'Rollo Tomassi',
    title: 'The Rational Male',
    _owner: user1Id
  }, {
    _id: book3Id,
    author: 'David Allen',
    title: 'Getting Things Done',
    _owner: user1Id,
    _requestedBy: user0Id
  }
];

let c = -1;
usersList.forEach(user => {
  user.books.push(booksList[++c]._id, booksList[++c]._id);
});

function seed(done) {
  const { books, users } = mongoose.connection.collections;

  users.drop(() => {
    books.drop(() => {
      Promise.all([User.insertMany(usersList), Book.insertMany(booksList)])
      .then((data) => {
        done()
      })
      .catch(e => console.log(e))
    });
  });
}

module.exports = {
  seed,
  usersList,
  booksList
}
