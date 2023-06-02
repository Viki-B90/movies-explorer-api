const router = require('express').Router();

const { NotFoundError } = require('../errors/index-errors');
const messages = require('../utils/messages');

const routesUsers = require('./users');
const routesMovies = require('./movies');

router.use(routesUsers);
router.use(routesMovies);

router.use('*', (req, res, next) => {
  next(new NotFoundError(messages.errorsMessages.pageNotFound));
});

module.exports = router;