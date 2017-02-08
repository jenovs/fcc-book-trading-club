const router = require('express').Router();

const { getUser } = require('./../controllers/users');
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

router.get('/', checkAuth, getUser)

// Temp route to create test user
router.post('/', (req, res) => {
  const newUser = new User({
    username: 'userOne'
  });
  newUser.save()
    .then(data => res.send(data))
    .catch(e => {
      console.log(e.message);
      res.status(400).send()
    })
})

module.exports = router;
