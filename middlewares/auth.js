const jwt = require('jsonwebtoken');
const { UnauthError } = require('../errors/index-errors');

const { NODE_ENV, JWT_SECRET } = process.env;
const messages = require('../utils/messages');

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthError(messages.errorsMessages.authRequired));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'test-secret-word');
  } catch (error) {
    return next(new UnauthError(messages.errorsMessages.wrongToken));
  }

  req.user = payload;

  return next();
};
