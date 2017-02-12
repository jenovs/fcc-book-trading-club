const app = require('./../server-test');
// const app = require('./../server');
// const request = require('supertest');
const expect = require('expect');
const { seed, usersList, booksList } = require('./../seed/seed');
const Book = require('./../models/book');
const User = require('./../models/user');

describe('Test /api/books router', () => {
  beforeEach(done => {
    seed(done);
  });

  describe('GET /api/books', () => {

    it('GET /api/books route should exist', (done) => {
      app
      .get('/api/books')
      .expect(200)
      .expect(res => {
        expect(res.req.path).toBe('/api/books');
      })
      .end(done);
    });

    it('Should return an array of books', (done) => {
      app
      .get('/api/books')
      .expect(200)
      .expect(res => {
        const d = res.body;
        expect(d.length).toBe(4);
        expect(d[0].title).toBe(booksList[0].title);
        expect(d[0].author).toBe(booksList[0].author);
        expect(d[0]._owner._id).toEqual(usersList[0]._id);
        expect(d[0]._owner.username).toBe(usersList[0].username);
        expect(d[0]._requestedBy).toNotExist();
        expect(d[3].title).toBe(booksList[3].title);
        expect(d[3].author).toBe(booksList[3].author);
        expect(d[3]._owner._id).toEqual(usersList[1]._id);
        expect(d[3]._owner.username).toBe(usersList[1].username);
        expect(d[3]._requestedBy).toNotExist();
      })
      .end(done);
    });
  });

  describe('POST /api/books/', () => {
    const newBook = {
      title: 'Soft Skills',
      author: 'John Sonmez'
    }

    it('Should add a valid book', (done) => {
      let newBookId;
      app
      .post('/api/books')
      .set('x-test-user', usersList[1].username)
      .send(newBook)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        Book.find()
        .then(books => {
          newBookId = books[4]._id;
          expect(books.length).toBe(5);
          expect(books[4].title).toBe(newBook.title);
          expect(books[4].author).toBe(newBook.author);
          expect(books[4]._owner).toEqual(usersList[1]._id);
          return User.findById(usersList[1]._id)
        })
        .then(user => {
          expect(user.books.length).toBe(3);
          expect(user.books[2]).toEqual(newBookId);
          done();
        })
        .catch(e => done(e));
      });
    });

    it('Should return 400 if title is missing', (done) => {
      app
      .post('/api/books')
      .set('x-test-user', usersList[1].username)
      .send({author: 'Author'})
      .expect(400)
      .end(done);
    });

    it('Should return 400 if author is missing', (done) => {
      app
      .post('/api/books')
      .set('x-test-user', usersList[1].username)
      .send({title: 'Title'})
      .expect(400)
      .end(done);
    });

    it('Should return 400 if author and title are missing', (done) => {
      app
      .post('/api/books')
      .set('x-test-user', usersList[1].username)
      .send()
      .expect(400)
      .end(done);
    });

    it('Should return 401 if not logged in', (done) => {
      app
      .post('/api/books')
      .send(newBook)
      .expect(401)
      .end(done);
    });
  });

});
