const Book = require('./../models/book');
const User = require('./../models/user');

function getMyTradeRequests(req, res) {
  if (!req.user) return res.status(401).send();
  User.findOne({username: req.user})
  .populate({path: 'requestedBooks', select: '_id author title'})
  .then(user => {
    res.send(user.requestedBooks)
  })
  .catch(e => {
    console.log(e);
    res.status(401).send()
  });
}

module.exports = {
  getMyTradeRequests
}
