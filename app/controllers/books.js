const Book = require('./../models/book');
const User = require('./../models/user');

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
    .then(() => res.status(201).send({message: 'success'}))
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
    .then(() => res.send(deletedBook))
    .catch(e => res.status(400).send());
}

function requestBookTrade(req, res) {
  let updUser;
  User.findOne({username: req.user})
    .then(user => {
      updUser = user;
      if (~user.requestedBooks.indexOf(req.params.id)) throw Error;
      user.requestedBooks.push(req.params.id)
      return Book.findById(req.params.id)
    })
    .then(book => {
      if (!book.requestedBy) {
        book.requestedBy = updUser._id;
      }
      return Promise.all([book.save(), updUser.save()])
    })
    .then(data => res.send({success: 'OK'}))
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
}

module.exports = {
  addBook,
  deleteBook,
  findBooks,
  requestBookTrade
};
