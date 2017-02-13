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
});
