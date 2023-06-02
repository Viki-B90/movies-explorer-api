const routesUsers = require('express').Router();
const auth = require('../middlewares/auth');

const {
  createUser,
  login,
  logout,
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  validateUserAuth,
  validateUserCreate,
  validateUpdateUser,
} = require('../middlewares/validators');

routesUsers.post('/signup', validateUserCreate, createUser);
routesUsers.post('/signin', validateUserAuth, login);

routesUsers.use(auth);

routesUsers.get('/signout', logout);
routesUsers.get('/me', getUser);
routesUsers.patch('/me', validateUpdateUser, updateUser);

module.exports = routesUsers;