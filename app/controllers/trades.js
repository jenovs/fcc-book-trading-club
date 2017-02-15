const Book = require('./../models/book');
const User = require('./../models/user');

function getMyTradeRequests(req, res) {
  if (!req.user) return res.status(401).send();
  User.findOne({username: req.user})
  .populate({path: 'requestedBooks', select: '_id author title'})
  .then(user => {
    res.send(user.requestedBooks)
  })
  .catch(e => {
    console.log(e);
    res.status(401).send()
  });
}

function createTradeRequest(req, res) {
  if (!req.user) return res.status(401).send();
  let updUser, updBook;
  User.findOne({username: req.user})
  .then(user => {
    if (~user.requestedBooks.indexOf(req.params.id)) throw 400;
    updUser = user
  })
  .then(() => Book.findById(req.params.id))
  .then(book => {
    if (!book || book._requestedBy || book._owner.equals(updUser._id)) throw 400;
    updBook = book;
  })
  .then(() => {
    updUser.requestedBooks.push(updBook._id);
    updBook._requestedBy = updUser._id;
    return Promise.all([updUser.save(), updBook.save()]);
  })
  .then(() => res.send())
  .catch(e => {
    // console.log(e);
    res.status(400).send();
  })
}

function deleteTradeRequest(req, res) {
  if (!req.user) return res.status(401).send();

  let updUser;

  Promise.all([
    User.findOne({username: req.user}),
    Book.findById(req.params.id)
  ])
  .then(([user, book]) => {
    if (!user || !book) throw 400;
    // If user is deleting his own request
    if (user._id.equals(book._requestedBy)) {
      return delMyRequest(user, book)
    }
    // If user is deleting request from the book he owns
    if (user._id.equals(book._owner)) {
      return delBookRequest(book);
    }
  })
  .then(() => {
    res.send();
  })
  .catch(e => {
    // console.log(e);
    res.status(400).send();
  })
}

function delMyRequest(user, book) {
  const ind = user.requestedBooks.indexOf(book._id);
  user.requestedBooks.splice(ind, 1);
  book._requestedBy = undefined;
  return Promise.all([user.save(), book.save()]);
}

function delBookRequest(book) {
  const user = book._requestedBy;
  return User.findById(user)
  .then(user => {
    const ind = user.requestedBooks.indexOf(book._id);
    user.requestedBooks.splice(ind, 1);
    book._requestedBy = undefined;
    return Promise.all([user.save(), book.save()])
  })
}

module.exports = {
  getMyTradeRequests,
  createTradeRequest,
  deleteTradeRequest
}
