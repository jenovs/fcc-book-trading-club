const Book = require('./../models/book');
const User = require('./../models/user');
const { emitUpdate } = require('./helpers')

function findBooks(req, res) {
  Book.find({}, '-__v')
  .sort('_id')
  .populate({path: '_owner', select: 'username'})
  .then(data => res.send(data))
  .catch(e => console.log(e));
}

function addBook(req, res) {
  if (!req.user) return res.status(401).send();
  if (!req.body.title || !req.body.author) return res.status(400).send();
  User.findOne({username: req.user})
    .then(user => {
      const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        coverUrl: req.body.coverUrl,
        _owner: user
      });
      user.books.push(newBook)

      return Promise.all([newBook.save(), user.save()]);
    })
    .then(() => {
      res.status(201).send({message: 'success'})
      emitUpdate(req);
    })
    .catch(e => {
      console.log(e.message)
      res.status(400).send();
    });
}

function deleteBook(req, res) {
  if (!req.user) return res.status(401).send();
  let deletedBook = {};
  let currentUser = {};
  User.findOne({username: req.user})
    .then(user => {
      currentUser = user;
      return Book.findOneAndRemove({_id: req.params.id, _owner: currentUser._id})
    })
    .then(book => {
      if (!book) throw Error;
      deletedBook = book;
    })
    .then(() => {
      const bookInd = currentUser.books.indexOf(req.params.id);
      currentUser.books.splice(bookInd, 1);
      return currentUser.save();
    })
    .then(() => {
      res.send(deletedBook)
      emitUpdate(req);
    })
    .catch(e => res.status(400).send());
}

module.exports = {
  addBook,
  deleteBook,
  findBooks
};
