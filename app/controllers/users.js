const User = require('./../models/user');

function getUser(req, res) {
  User.findOne({username: req.user})
    .populate('books')
    .then(data => res.send(data))
    .catch(e => console.log(e));
}

module.exports = {
  getUser
}
