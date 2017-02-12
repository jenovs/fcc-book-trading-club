const Book = require('./../models/book');
const User = require('./../models/user');

function findBooks(req, res) {
  Book.find({}, '-__v')
  .populate({path: '_owner', select: 'username'})
  .then(data => res.send(data))
  .catch(e => console.log(e));
}

function addBook(req, res) {
  // console.log('req.user', req.user);
  if (!req.user) return res.status(401).send();
  if (!req.body.title || !req.body.author) return res.status(400).send();
  User.findOne({username: req.user})
    .then(user => {
      // console.log(user);
      const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        _owner: user
      });
      // newBook._owner = user;
      user.books.push(newBook)

      return Promise.all([newBook.save(), user.save()]);
    })
    // .then(data => res.status(201).send(data))
    .then(() => res.status(201).send({message: 'success'}))
    .catch(e => {
      console.log(e.message)
      res.status(400).send();
    });
}

function deleteBook(req, res) {
  console.log('deleteBook', req.params.id);
  let deletedBook = {};
  let currentUser = {};
  User.findOne({username: req.user})
    .then(user => {
      currentUser = user;
      // user._id
      return Book.findOneAndRemove({_id: req.params.id, owner: currentUser._id})
    })
  // Book.findByIdAndRemove(req.params.id)

    .then(book => {
      console.log('book', book);
      deletedBook = book;
      // return book.owner
    })
    // .then(ownerId => User.findById(ownerId))
    .then(() => {
      const bookInd = currentUser.books.indexOf(req.params.id);
      currentUser.books.splice(bookInd, 1);
      return currentUser.save();
    })
    .then(() => res.send(deletedBook))
    .catch(e => console.log(e));
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

function cancelBookTrade(req, res) {

}

function confirmBookTrade(req, res) {

}

function rejectBookTrade(req, res) {

}

module.exports = {
  addBook,
  deleteBook,
  findBooks,
  requestBookTrade
};
