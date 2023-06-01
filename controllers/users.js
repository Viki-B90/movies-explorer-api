const bcrypt = require('bcryptjs');
const User = require('../models/user');
const getJwtToken = require('../utils/jwt');
const statusCode = require('../utils/statusCode');

const {
  BadRequestError,
  ConflictError,
} = require('../errors/index-errors');

const messages = require('../utils/messages');

const SALT_ROUNDS = require('../utils/config');

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, Number(SALT_ROUNDS))
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => res.status(statusCode.CREATED).send({
          email: user.email,
          name: user.name,
        }))
        .catch((error) => {
          if (error.name === 'MongoServerError' || error.code === 11000) {
            next(new ConflictError({ message: messages.errorsMessages.emailConflict }));
          } else if (error.name === 'ValidationError') {
            next(new BadRequestError({ message: messages.errorsMessages.invalidUserData }));
          } else {
            next(error);
          }
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken(user._id);
      res
        .cookie('jwt', token, {
          maxage: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({ token });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: messages.successMessages.logoutSuccess });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user.payload)
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user.payload,
    { email, name },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch((error) => {
      if (error.name === 'MongoServerError' || error.code === 11000) {
        next(new ConflictError({ message: messages.errorsMessages.emailConflict }));
      } else if (error.name === 'ValidationError') {
        next(new BadRequestError({ message: messages.errorsMessages.invalidUserId }));
      } else {
        next(error);
      }
    });
};