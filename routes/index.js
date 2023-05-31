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

const {
  createUser,
  login,
  logout,
} = require('../controllers/users');

router.post('/signup', validateUserCreate, createUser);
router.post('/signin', validateUserAuth, login);
router.get('/signout', logout);

router.use(auth);

router.use('/users', routesUsers);
router.use('/movies', routesMovies);

router.use((req, res, next) => {
  next(new NotFoundError(messages.errorsMessages.pageNotFound));
});

module.exports = router;