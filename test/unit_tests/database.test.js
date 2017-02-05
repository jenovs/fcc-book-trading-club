require('./../../config/config');

const expect = require('chai').expect;
const mongoose = require('mongoose');
const User = require('./../../models/user');
const Book = require('./../../models/book');

const {
  MONGODB_URI,
  PORT
} = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI);

const user = new User({
  username: 'admin'
});

before(done => {
  const { users } = mongoose.connection.collections;
  users.drop(() => {
    user.save()
      .then(() => done())
  })
});

beforeEach((done) => {
  const { books } = mongoose.connection.collections;
  books.drop(() => {
    done()
  })
});



describe('Adding a book', () => {

  // book.owner = user;

  it('Should add a book', (done) => {
    const book = new Book({
      title: 'A new book',
      author: 'John Doe'
    })
    book.owner = user;

    book.save()
    .then(() => {
      Book.find({title: book.title})
      .then(data => {
        expect(data.length).to.be.equal(1);
        expect(data[0].title).to.be.equal(book.title);
        expect(data[0].author).to.be.equal(book.author);
        expect(data[0].owner).to.eql(user._id);
        done();
      })
      .catch(e => done(e));
    })
    .catch(e => done(e));
  });

  it('Should link a book to the user', (done) => {

    const book = new Book({
      title: 'A new book',
      author: 'John Doe'
    })

    book.owner = user;
    user.books.push(book);

    Promise.all([book.save(), user.save()])
      .then(() => User.findOne({username: user.username}).populate('books'))
      .then(user => {
        // console.log(user);
        expect(user.books.length).to.be.equal(1);
        expect(user.books[0]._id).to.be.eql(book._id);
        expect(user.books[0].title).to.be.equal(book.title);
        done();
      })
      .catch(e => done(e))
    // })
    // .catch(e => done(e));
  });
});
