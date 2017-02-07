const Book = require('./../models/book');

function findBooks(req, res) {
  Book.find({})
  .populate({path: 'owner', select: 'username -_id'})
  .then(data => res.send(data))
  .catch(e => console.log(e));
}

module.exports = {
  findBooks
};
