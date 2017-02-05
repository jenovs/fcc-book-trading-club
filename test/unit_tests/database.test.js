const expect = require('chai').expect;
const mongoose = require('./../../mongoose');
const User = require('./../../models/user');
const Book = require('./../../models/book');

describe('Adding a book', () => {

  const users = [{username: 'Bob'}]
  const userOne = new User(users[0]);

  beforeEach((done) => {
    const { books, users } = mongoose.connection.collections;
    users.drop(() => {
      books.drop(() => {
        userOne.save().then(() => done());
      });
    });
  });

  it('Should add a book and link it to user', (done) => {

    const book = new Book({
      title: 'A new book',
      author: 'John Doe'
    });

    book.owner = userOne;

    Promise.all([
      book.save(),
      User.findByIdAndUpdate(userOne._id, {$push: {books: book._id}})
    ])
    .then(() => {
      return Book.find({title: book.title}).populate('owner')
    })
    .then(data => {
      expect(data.length).to.be.equal(1);
      expect(data[0].title).to.be.equal(book.title);
      expect(data[0].author).to.be.equal(book.author);
      expect(data[0].owner.username).to.equal(userOne.username);
      expect(data[0].owner._id).to.eql(userOne._id);
    })
    .then(() => {
      return User.findById(userOne._id).populate('books')
    })
    .then(data => {
      expect(data.books.length).to.be.equal(1);
      done();
    })
    .catch(e => done(e));
  });
});
