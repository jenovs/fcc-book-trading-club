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
      const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
      });
      newBook.owner = user;
      user.books.push(newBook)

      return Promise.all([newBook.save(), user.save()]);
    })
    .then(data => res.send(data))
    .catch(e => console.log(e.message));
}

module.exports = {
  addBook,
  findBooks
};
