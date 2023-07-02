const mongoose = require('mongoose');
const validator = require('validator');
const messages = require('../utils/messages');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: false,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String || null,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: messages.errorsMessages.invalidUrl,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: messages.errorsMessages.invalidUrl,
    },
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: false,
  },
  thumbnail: {
    type: String,
    required: false,
    validate: {
      validator: (value) => validator.isURL(value),
      message: messages.errorsMessages.invalidUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  liked: {
    type: Boolean,
    required: true,
  },
});

exports.movie = mongoose.model('movie', movieSchema);
