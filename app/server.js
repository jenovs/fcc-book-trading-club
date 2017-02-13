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
const trades = require('./routes/trades');

const Book = require('./models/book');
const User = require('./models/user');

const { usersList } = require('./seed/seed');

const {
  PORT
} = process.env;

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: '',
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

// Temp hack to do testing.
// Mock the loggded in user.
if (process.env.NODE_ENV === 'test') {
  app.use((req, res, next) => {
    req.user = req.headers['x-test-user'];
    next();
  });
}

// Mock the loggded in user 'userTwo'.
// app.use((req, res, next) => {
//   req.user = 'userTwo';
//   next();
// });

app.use('/api/books', books);
app.use('/api/users', users);
app.use('/api/trades', trades);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});

module.exports = app;
