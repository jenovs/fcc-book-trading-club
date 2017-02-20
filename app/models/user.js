const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'book'
  }],
  requestedBooks: [{
    type: Schema.Types.ObjectId,
    ref: 'book'
  }],
  fullName: String,
  city: String,
  state: String
});

module.exports = mongoose.model('user', UserSchema);
