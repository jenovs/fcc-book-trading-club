require('./config/config');

console.log('Process:', process.env.NODE_ENV);

const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
// const passport = require('passport');
// const session = require('express-session');
const mongoose = require('./mongoose');
const bodyParser = require('body-parser');
const books = require('./routes/books');
const users = require('./routes/users');

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

// Mock the loggded in user 'userOne'.
// app.use((req, res, next) => {
//   req.user = 'userOne';
//   next();
// });

// Mock the loggded in user 'userTwo'.
app.use((req, res, next) => {
  req.user = 'userTwo';
  next();
});

app.use('/books', books);
app.use('/users', users);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});

module.exports = app;
