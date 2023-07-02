const messages = require('../utils/messages');

exports.handleErrors = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode).send({
    message: statusCode === 500
      ? `${messages.errorsMessages.serverErrorMessage} ${message}`
      : message,
  });
  return next();
};