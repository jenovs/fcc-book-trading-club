require('./config/config');

console.log('Process:', process.env.NODE_ENV);

const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
// const passport = require('passport');
// const session = require('express-session');
const mongoose = require('./mongoose');
const bodyParser = require('body-parser');

const Book = require('./models/book');
const User = require('./models/user');

const {
  PORT
} = process.env;

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: 'Do you even lift?',
//   resave: true,
//   saveUninitialized: true
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

// app.get('/auth/twitter', passport.authenticate('twitter'));
//
// app.get('/auth/twitter/callback',
//   passport.authenticate('twitter', {failureRedirect: '/fail'}),
//   (req, res, next) => {
//     res.redirect('/');
//   }
// );
//
// app.get('/auth/logout', (req, res) => {
//   req.logout();
//   res.redirect('/')
// });

app.get('/books', (req, res) => {
  // console.log('getting books');
  Book.find({})
    .populate('owner')
    .then(data => res.send(data))
    .catch(e => console.log(e));
});

app.post('/books', (req, res) => {
  User.findOne({username: 'admin'})
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
});

// Temp route to create test user
app.post('/user', (req, res) => {
  const newUser = new User({
    username: 'admin'
  });
  newUser.save()
    .then(data => res.send(data))
    .catch(e => {
      console.log(e.message);
      res.status(400).send()
    })
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});

module.exports = {app};
