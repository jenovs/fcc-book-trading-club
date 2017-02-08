const router = require('express').Router();

const { addBook, findBooks } = require('./../controllers/books');


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

router.post('/', checkAuth, addBook);

module.exports = router;
