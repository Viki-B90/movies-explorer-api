const router = require('express').Router();

const auth = require('../middlewares/auth');

const { NotFoundError } = require('../errors/index-errors');
const messages = require('../utils/messages');

const {
  validateUserCreate,
  validateUserAuth,
} = require('../middlewares/validators');

const routesUsers = require('./users');
const routesMovies = require('./movies');
const routesLogout = require('./logout');

const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signup', validateUserCreate, createUser);
router.post('/signin', validateUserAuth, login);

router.use('/users', auth, routesUsers);
router.use('/movies', auth, routesMovies);
router.use('/signout', auth, routesLogout);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(messages.errorsMessages.pageNotFound));
});

module.exports = router;