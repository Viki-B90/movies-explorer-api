const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Страна создания фильма должна быть указана.'],
  },
  director: {
    type: String,
    required: [true, 'Режиссер фильма должен быть указан.'],
  },
  duration: {
    type: Number,
    required: [true, 'Продолжительность фильма должна быть указана.'],
  },
  year: {
    type: String,
    required: [true, 'Год создания фильма должен быть указан.'],
  },
  description: {
    type: String,
    required: [true, 'Описание фильма должно быть обязательно указано.'],
  },
  image: {
    type: String,
    required: [true, 'Ссылка на постер к фильму должна быть обязательна'],
    validate: {
      validator: (link) => validator.isURL(link),
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Ссылка на трейлер фильма должна быть обязательна'],
    validate: {
      validator: (link) => validator.isURL(link),
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Ссылка на мини-постер к фильму должна быть обязательна'],
    validate: {
      validator: (link) => validator.isURL(link),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'id фильма должен быть обязательно указан.'],
  },
  nameRU: {
    type: String,
    required: [true, 'Название фильма на русском должно быть обязательно.'],
  },
  nameEN: {
    type: String,
    required: [true, 'Название фильма на английском должно быть обязательно.'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);