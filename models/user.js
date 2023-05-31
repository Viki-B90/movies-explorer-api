const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { UnauthError } = require('../errors/index-errors');
const messages = require('../utils/messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Необходима электронная почта.'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Указана неверная почта.',
    },
  },
  password: {
    type: String,
    required: [true, 'Необходим пароль.'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Не указано имя.'],
    minlength: [2, 'Имя не должно быть короче 2-х символов.'],
    maxlength: [30, 'Имя не должно быть длиннее 30-и символов.'],
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
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
};

module.exports = mongoose.model('user', userSchema);