const router = require('express').Router();

const { addBook, deleteBook, findBooks, requestBookTrade } = require('./../controllers/books');

let checkAuth;

if (process.env.NODE_ENV === 'test') {
  checkAuth = (req, res, next) => {
    next();
  }
} else {
  checkAuth = (req, res, next) => {
    console.log('checking auth...', req.user);
    if (!req.user) return res.status(401).send();
  }
}
// // Mock the loggded in user 'userOne'.
// router.use((req, res, next) => {
//   req.user = 'userOne';
//   next();
// });

// Get an array of all books
router.get('/', findBooks);

router.post('/', checkAuth, addBook);

// router.put('/:id', checkAuth, requestBookTrade)

router.delete('/:id', checkAuth, deleteBook);

module.exports = router;
