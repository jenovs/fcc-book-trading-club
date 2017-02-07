const app = require('./../server-test');
const expect = require('expect');
const seed = require('./../seed/seed');

describe('Test /books router', () => {
  beforeEach(done => {
    console.log('beforeEach');
    seed(done);
  })

  it('should run tests', () => {
    console.log('running tests...');
  })

  xit('GET /books route should exist', (done) => {
    app.get('/books')
    .expect(200)
    .expect(res => {
      expect(res.req.path).toBe('/books');
    })
    .end(done);
  });

  xit('Should return an array of books', (done) => {
    done();
  });
})
