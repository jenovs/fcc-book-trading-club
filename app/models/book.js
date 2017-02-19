const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const BookSchema = new Schema({
  title: String,
  author: String,
  coverUrl: String,
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  _requestedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('book', BookSchema);
