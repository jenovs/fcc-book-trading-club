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
    if (!req.user) return res.redirect('/');
    next();
  }
}

router.get('/', checkAuth, getUser);

router.put('/', checkAuth, updateUser);

module.exports = router;
