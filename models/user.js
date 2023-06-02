const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { UnauthError } = require('../errors/index-errors');
const messages = require('../utils/messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: messages.errorsMessages.invalidEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, {
  versionKey: false,
  statics: {
    findUserByCredentials(email, password) {
      return this.findOne({ email }).select('+password')
        .then((user) => {
          if (!user) {
            throw new UnauthError(messages.errorsMessages.wrongAuth);
          }

          return bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                throw new UnauthError(messages.errorsMessages.wrongAuth);
              }
              return user;
            });
        });
    },
  },
});

module.exports = mongoose.model('user', userSchema);