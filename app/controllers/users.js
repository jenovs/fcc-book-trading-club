const User = require('./../models/user');

function getUser(req, res) {
  if (!req.user) return res.status(401).send();
  User.findOne({username: req.user})
    .populate('books')
    .then(data => res.send(data))
    .catch(e => console.log(e));
}

function updateUser(req, res) {
  if (!req.user) return res.status(401).send();

  User.findOneAndUpdate({username: req.user}, req.body, {new: true})
    .then(user => {
      res.send();
    })
    .catch(e => {
      res.status(400).send();
      console.log(e)
    })
}

module.exports = {
  getUser,
  updateUser
}
