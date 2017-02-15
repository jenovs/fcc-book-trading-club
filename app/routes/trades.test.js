const app = require('./../server-test');
const expect = require('expect');
const { seed, usersList, booksList } = require('./../seed/seed');
const Book = require('./../models/book');
const User = require('./../models/user');

describe('Test /api/trades router', () => {
  beforeEach(done => {
    seed(done);
  });

  describe('GET /api/trades', () => {

    it('Should get my trades', (done) => {
      app
      .get('/api/trades/')
      .set('x-test-user', usersList[0].username)
      .expect(200)
      .expect(res => {
        const d = res.body;
        expect(d.length).toBe(1);
        expect(d[0]._id).toEqual(booksList[3]._id);
        expect(d[0].title).toBe(booksList[3].title);
        expect(d[0].author).toBe(booksList[3].author);
      })
      .end(done)
    });

    it('Should send 401 if unauthorized', (done) => {
      app
      .get('/api/trades')
      .expect(401)
      .end(done);
    });
  });

  describe('POST /api/trades/:id', () => {

    it('Shuld create a book request', (done) => {
      app
      .post(`/api/trades/${booksList[0]._id}`)
      .set('x-test-user', usersList[1].username)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        Book.findById(booksList[0]._id)
        .then(book => {
          expect(book._requestedBy).toEqual(usersList[1]._id)
        })
        .then(() => User.findById(usersList[1]._id))
        .then(user => {
          expect(user.requestedBooks.length).toBe(1);
          expect(user.requestedBooks[0]).toEqual(booksList[0]._id);
          done();
        })
        .catch(e => done(e));
      });
    });

    it('Should add to existing book requests', (done) => {
      app
      .post(`/api/trades/${booksList[2]._id}`)
      .set('x-test-user', usersList[0].username)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        Book.findById(booksList[2]._id)
        .then(book => {
          expect(book._requestedBy).toEqual(usersList[0]._id)
        })
        .then(() => User.findById(usersList[0]._id))
        .then(user => {
          expect(user.requestedBooks.length).toBe(2);
          expect(user.requestedBooks[1]).toEqual(booksList[2]._id);
          done();
        })
        .catch(e => done(e));
      });
    });

    it('Should not be able request my own book', (done) => {
      app
      .post(`/api/trades/${booksList[0]._id}`)
      .set('x-test-user', usersList[0].username)
      .expect(400)
      .end(done);
    });

    it('Should return 401 if unauthorized', (done) => {
      app
      .post(`/api/trades/${booksList[0]._id}`)
      .expect(401)
      .end(done);
    });

    it('Should handle bad request', (done) => {
      app
      .post(`/api/trades/123abc`)
      .set('x-test-user', usersList[0].username)
      .expect(400)
      .end(done);
    });

    it('Should not be able to request a book twice', (done) => {
      app
      .post(`/api/trades/${booksList[3]._id}`)
      .set('x-test-user', usersList[0].username)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        User.findOne({username: usersList[0].username})
        .then(user => {
          expect(user.requestedBooks.length).toBe(1);
          expect(user.requestedBooks[0]).toEqual(booksList[3]._id);
          return Book.findById(booksList[3]._id)
        })
        .then(book => {
          expect(book._requestedBy).toEqual(usersList[0]._id);
          done();
        })
        .catch(e => done(e));
      });
    });
  });

  describe('DELETE /api/trades/:id', () => {

    it('Should delete my trade request', (done) => {
      app
      .delete(`/api/trades/${booksList[3]._id}`)
      .set('x-test-user', usersList[0].username)
      .expect(200)
      .end(err => {
        if (err) return done(err);

        User.findOne({username: usersList[0].username})
        .then(user => {
          expect(user.requestedBooks.length).toBe(0);
          return Book.findById(booksList[3]._id)
        })
        .then(book => {
          expect(book._requestedBy).toNotExist();
          done();
        })
        .catch(e => done(e));
      });
    });

    it('Should delete request if I am the owner of the book', (done) => {
      app
      .delete(`/api/trades/${booksList[3]._id}`)
      .set('x-test-user', usersList[1].username)
      .expect(200)
      .end(err => {
        if (err) return done(err);

        Promise.all([
          User.findOne({username: usersList[0].username}),
          Book.findById(booksList[3]._id)
        ])
        .then(([user, book]) => {
          expect(book._requestedBy).toNotExist();
          expect(user.requestedBooks.indexOf(book._id)).toBe(-1);
          done();
        })
        .catch(e => done(e));
      });
    });

    it('Should return 401 if unauthorized', (done) => {
      app
      .delete(`/api/trades/${booksList[3]._id}`)
      .expect(401)
      .end(done);
    });

    it('Should handle incorrect input', (done) => {
      app
      .delete(`/api/trades/123abc`)
      .set('x-test-user', usersList[0].username)
      .expect(400)
      .end(done);
    });
  });

  describe('PUT /api/trades', () => {

    it('Should confirm a trade request', (done) => {
      app
      .put(`/api/trades/${booksList[3]._id}`)
      .set('x-test-user', usersList[1].username)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        Promise.all([
          User.findOne({username: usersList[0].username}).populate('books'),
          User.findOne({username: usersList[1].username}),
          Book.findById(booksList[3]._id)
        ])
        .then(([user0, user1, book]) => {
          expect(user0.books.length).toBe(3);
          expect(user1.books.length).toBe(1);
          expect(book._owner).toEqual(user0._id);
          expect(user0.books[2]._id).toEqual(booksList[3]._id);
          expect(user0.books[2].title).toBe(booksList[3].title);
          expect(user0.books[2].author).toBe(booksList[3].author);
          done();
        })
        .catch(e => done(e));
      });
    });

    it('Should return 401 if unauthorized', (done) => {
      app
      .put(`/api/trades/${booksList[3]._id}`)
      .expect(401)
      .end(done);
    });

    it('Should handle invalid request', (done) => {
      app
      .put(`/api/trades/123abc`)
      .set('x-test-user', usersList[1].username)
      .expect(400)
      .end(done);
    });

  });
});
