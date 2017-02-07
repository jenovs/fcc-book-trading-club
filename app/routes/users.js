const router = require('express').Router();

const Book = require('./../models/book');
const User = require('./../models/user');

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
