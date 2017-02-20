const router = require('express').Router();

const { getUser, updateUser } = require('./../controllers/users');
const Book = require('./../models/book');
const User = require('./../models/user');

const checkAuth = (req, res, next) => {

  next();
}

router.get('/', checkAuth, getUser);

router.put('/', checkAuth, updateUser);

// Temp route to create test user
router.post('/', (req, res) => {
  const newUser = new User({
    username: 'userTwo'
  });
  newUser.save()
    .then(data => res.send(data))
    .catch(e => {
      console.log(e.message);
      res.status(400).send()
    })
})

module.exports = router;
