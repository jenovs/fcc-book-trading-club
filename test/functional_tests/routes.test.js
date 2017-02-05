require('./../../config/config');

const request = require('supertest');
const expect = require('expect');
const mongoose = require('./../../mongoose');

const { app } = require('./../../app');
const Book = require('./../../models/book');
const User = require('./../../models/user');

// const {
//   MONGODB_URI,
//   PORT
// } = process.env;


// before(done => {
//   mongoose.Promise = global.Promise;
//   mongoose.connect(MONGODB_URI, () => {
//     console.log('connected');
//     done();
//   });
// });
//
// after(done => {
//   mongoose.disconnect(() => {
//     console.log('disconnected');
//     done();
//   });
// });

describe('Test setup', () => {

  it('should run test suite', () => {

  })
})
