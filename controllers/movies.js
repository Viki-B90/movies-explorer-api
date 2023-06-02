const Movie = require('../models/movie');
const statusCode = require('../utils/statusCode')

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../errors/index-errors');

const messages = require('../utils/messages');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user.payload;

  Movie.find({ owner })
    .then((movies) => {
      res.status(statusCode.CREATED).send(movies);
    })
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const owner = req.user.payload;

  Movie.create({ owner, ...req.body })
    .then((movie) => res.status(statusCode.CREATED).send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(messages.errorsMessages.invalidData));
      } else {
        next(error);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.user.payload;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(messages.errorsMessages.notfoundMovie));
      }
      if (String(movie.owner) !== owner) {
        return next(new ForbiddenError(messages.errorsMessages.forbiddenMovieDelete));
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => res.send({ message: messages.successMessages.movieDeleteSuccess }))
        .catch(next);
    })
    .catch(next);
};