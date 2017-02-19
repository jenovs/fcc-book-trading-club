const router = require('express').Router();

const { addBook, deleteBook, findBooks, requestBookTrade } = require('./../controllers/books');

let checkAuth;

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  checkAuth = (req, res, next) => {
    next();
  }
} else {
  checkAuth = (req, res, next) => {
    console.log('checking auth...', req.user);
    if (!req.user) return res.status(401).send();
  }
}

// Get an array of all books
router.get('/', findBooks);

router.post('/', checkAuth, addBook);

router.delete('/:id', checkAuth, deleteBook);

module.exports = router;
