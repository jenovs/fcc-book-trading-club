require('./../../config/config');

const request = require('supertest');
const expect = require('expect');
const mongoose = require('./../../mongoose');

const { app } = require('./../../app');
const Book = require('./../../models/book');
const User = require('./../../models/user');

const gBookList = [
  {
    author: 'John Doe',
    title: 'First book'
  }, {
    author: 'Jane Doe',
    title: 'Second book'
  }
];

const gUser = {
  username: 'John'
};

describe('GET /books', () => {
  let user;
  beforeEach(done => {
    const { books, users } = mongoose.connection.collections;

    users.drop(() => {
      books.drop(() => {
        user = new User(gUser);
        const book0 = new Book(gBookList[0]);
        book0.owner = user;
        const book1 = new Book(gBookList[1]);
        book1.owner = user;
        user.books.push(book0, book1);
        Promise.all([user.save(), book0.save(), book1.save()])
        .then(() => done());
      });
    })
  });

  it('route should exist', (done) => {
    request(app)
      .get('/books')
      .expect(200)
      .expect(res => {
        expect(res.req.path).toBe('/books');
      })
      .end(done);
  });

  it('should return a list of books', (done) => {
    request(app)
      .get('/books')
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(2);
        expect(res.body[0].author).toBe('John Doe');
        expect(res.body[0].title).toBe('First book');
        expect(res.body[0].owner).toBeAn('object');
        expect(res.body[0].owner._id).toEqual(user._id);
        expect(res.body[0].owner.username).toBe('John');
        expect(res.body[0].owner.books.length).toBe(2);
      })
      .end(done);
  })
});
