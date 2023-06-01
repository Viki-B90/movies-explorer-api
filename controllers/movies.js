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
        next(new BadRequestError({ message: messages.errorsMessages.invalidMovieData }));
      } else {
        next(error);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError({ message: messages.errorsMessages.notfoundMovie }));
      }
      if (movie.owner.toString() !== req.user.payload.toString()) {
        return next(new ForbiddenError({ message: messages.errorsMessages.forbiddenMovieDelete }));
      }
      return movie.remove()
        .then(() => res.send({ message: messages.successMessages.movieDeleteSuccess }))
        .catch(next);
    })
    .catch(next);
};