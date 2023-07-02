const userRoutes = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  validateUpdateUser,
} = require('../middlewares/validators');

userRoutes.get('/users/me', getUser);
userRoutes.patch('/users/me', validateUpdateUser, updateUser);

exports.userRoutes = userRoutes;
