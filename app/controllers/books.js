const Book = require('./../models/book');
const User = require('./../models/user');

function findBooks(req, res) {
  Book.find({})
  .populate({path: 'owner', select: 'username -_id'})
  .then(data => res.send(data))
  .catch(e => console.log(e));
}

function addBook(req, res) {
  User.findOne({username: req.user})
    .then(user => {
      console.log(user);
      const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
      });
      newBook.owner = user;
      return newBook.save()
    })
    .then(data => res.send(data))
    .catch(e => console.log(e.message));
}

module.exports = {
  addBook,
  findBooks
};
