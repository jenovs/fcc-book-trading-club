const router = require('express').Router();

const { getUser, updateUser } = require('./../controllers/users');
const Book = require('./../models/book');
const User = require('./../models/user');

if (process.env.NODE_ENV === 'test') {
  checkAuth = (req, res, next) => {
    next();
  }
} else {
  checkAuth = (req, res, next) => {
    console.log('checking auth...', req.user);
    // if (!req.user) return res.status(401).send();
    if (!req.user) return res.redirect('/');
    next();
  }
}

router.get('/', checkAuth, getUser);

router.put('/', checkAuth, updateUser);

// Temp route to create test user
// router.post('/', (req, res) => {
//   const newUser = new User({
//     username: 'userTwo'
//   });
//   newUser.save()
//     .then(data => res.send(data))
//     .catch(e => {
//       console.log(e.message);
//       res.status(400).send()
//     })
// })

module.exports = router;
