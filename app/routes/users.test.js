const app = require('./../server-test');
const expect = require('expect');
const { seed, usersList, booksList } = require('./../seed/seed');

const User = require('./../models/user');

describe('Test /api/users router', () => {
  beforeEach(done => seed(done))

  describe('GET /api/users', () => {

    it('Should get current user', (done) => {
      app
      .get('/api/users/')
      .set('x-test-user', usersList[0].username)
      .expect(200)
      .expect(res => {
        const d = res.body;
        expect(d.username).toBe(usersList[0].username);
        expect(d._id).toEqual(usersList[0]._id);
        expect(d.books.length).toBe(2);
        expect(d.requestedBooks.length).toBe(1);
      })
      .end(done)
    });

    it('Should return 401 if unauthorized', (done) => {
      app
      .get('/api/users/')
      .expect(401)
      .end(done);
    });
  });

  describe('PUT /api/users', () => {
    const data = {
      fullName: 'Jane Doe',
      city: 'Chicago',
      state: 'IL'
    }

    it('Should update a user', (done) => {
      app
      .put('/api/users/')
      .set('x-test-user', usersList[0].username)
      .send(data)
      .expect(200)
      .end(err => {
        if (err) done(err);
        User.findOne({username: usersList[0].username})
        .then(user => {
          expect(user.username).toBe(usersList[0].username);
          expect(user._id).toEqual(usersList[0]._id);
          expect(user.books.length).toBe(2);
          expect(user.requestedBooks.length).toBe(1);
          expect(user.fullName).toBe(data.fullName);
          expect(user.city).toBe(data.city);
          expect(user.state).toBe(data.state);
          done();
        })
        .catch(e => done(e));
      })
    });

    it('Should return 401 if unauthorized', (done) => {
      app
      .put('/api/users/')
      .send(data)
      .expect(401)
      .end(done);
    });

    it('Should handle empty request data', (done) => {
      app
      .put('/api/users/')
      .set('x-test-user', usersList[0].username)
      .expect(200)
      .end(done);
    })
  })
});
