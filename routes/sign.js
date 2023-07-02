const signRoutes = require('express').Router();

const {
  createUser,
  login,
} = require('../controllers/users');

const {
  validateUserCreate,
  validateUserAuth,
} = require('../middlewares/validators');

signRoutes.post('/signup', validateUserCreate, createUser);
signRoutes.post('/signin', validateUserAuth, login);

exports.signRoutes = signRoutes;
