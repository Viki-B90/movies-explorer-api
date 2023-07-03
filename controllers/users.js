const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { user } = require('../models/user');
const statusCode = require('../utils/statusCode');

const {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthError,
} = require('../errors/index-errors');

const messages = require('../utils/messages');

const { NODE_ENV, JWT_SECRET } = process.env;

exports.createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  user.create({
    name, email, password: hash,
  })
    .then((users) => res.status(statusCode.CREATED).send({
      name: users.name,
      email: users.email,
      _id: users._id,
    }))
    .catch((error) => {
      if (error.name === 'MongoServerError' || error.code === 11000) {
        next(new ConflictError(messages.errorsMessages.emailConflict));
      } else if (error.name === 'ValidationError') {
        next(new BadRequestError(messages.errorsMessages.invalidData));
      } else {
        next(error);
      }
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return user.findUserByCredentials(email, password)
    .then((users) => {
      const token = jwt.sign(
        { _id: users._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'test-secret-word',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxage: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({ token });
    })
    .catch(() => {
      next(new UnauthError(messages.errorsMessages.wrongAuth));
    });
};

exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: messages.successMessages.logoutSuccess });
};

exports.getUser = (req, res, next) => {
  user.findOne({ _id: req.user._id })
    .then((users) => {
      if (users) {
        res.send({
          name: users.name,
          email: users.email,
          _id: users._id,
        });
      } next(new NotFoundError(messages.errorsMessages.invalidUserId));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError(messages.errorsMessages.invalidData));
      } else {
        next(error);
      }
    });
};

exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  user.findOneAndUpdate(
    { _id: req.user._id },
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((users) => res.send({
      _id: users._id,
      email: users.email,
      name: users.name,
    }))
    .catch((error) => {
      if (error.name === 'MongoServerError' || error.code === 11000) {
        next(new ConflictError(messages.errorsMessages.emailConflict));
      } else if (error.name === 'ValidationError') {
        next(new BadRequestError(messages.errorsMessages.invalidData));
      } else {
        next(error);
      }
    });
};
