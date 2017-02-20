const router = require('express').Router();

const {
  getMyTradeRequests,
  createTradeRequest,
  deleteTradeRequest,
  confirmTradeRequest
} = require('./../controllers/trades');

let checkAuth;

if (process.env.NODE_ENV === 'test') {
  checkAuth = (req, res, next) => {
    next();
  }
} else {
  checkAuth = (req, res, next) => {
    console.log('checking auth...', req.user);
    if (!req.user) return res.status(401).send();
    next();
  }
}

router.get('/', checkAuth, getMyTradeRequests);

router.post('/:id', checkAuth, createTradeRequest);

router.delete('/:id', checkAuth, deleteTradeRequest);

router.put('/:id', checkAuth, confirmTradeRequest)

// :id is requested book id
// router.delete('/:id', checkAuth, deleteTradeRequest);

// router.put('/:id', checkAuth, confirmTradeRequest);

// router.post('/:id', checkAuth, createTradeRequest);

module.exports = router;
