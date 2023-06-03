const jwt = require('jsonwebtoken');
const { UnauthError } = require('../errors/index-errors');

const { NODE_ENV, JWT_SECRET } = require('../utils/config');

const messages = require('../utils/messages');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthError(messages.errorsMessages.authRequired);
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? 'test-secret-word' : JWT_SECRET);
  } catch (err) {
    throw new UnauthError(messages.errorsMessages.wrongToken);
  }

  req.user = payload;

  next();
};