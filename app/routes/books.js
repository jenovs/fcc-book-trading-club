const router = require('express').Router();

const { findBooks } = require('./../controllers/books');
const Book = require('./../models/book');
const User = require('./../models/user');

const checkAuth = (req, res, next) => {
  next();
}
// Mock the loggded in user 'userOne'.
router.use((req, res, next) => {
  req.user = 'userOne';
  next();
});

// Get an array of all books
router.get('/', findBooks);

router.post('/', checkAuth, (req, res) => {
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
  // res.send('Not ready yet')
  // res.redirect('/');
})

module.exports = router;
