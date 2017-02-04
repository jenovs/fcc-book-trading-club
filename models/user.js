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
  }]
});

module.exports = mongoose.model('user', UserSchema);
