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
      console.log(book);
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

module.exports = {
  addBook,
  deleteBook,
  findBooks
};
