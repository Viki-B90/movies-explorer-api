const { movie } = require('../models/movie');
const statusCode = require('../utils/statusCode')

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../errors/index-errors');

const messages = require('../utils/messages');

exports.getMovies = (req, res, next) => {
  movie.find({})
    .then((movies) => res.status(statusCode.CREATED).send(movies))
    .catch(next);
};

exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    id,
    liked,
  } = req.body;
  const ownerId = req.user._id;
  const moviesId = req.params._id;
  movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner: ownerId,
    id,
    _id: moviesId,
    liked,
  })
    .then((movies) => {
      res.send({
        country: movies.country,
        director: movies.director,
        duration: movies.duration,
        year: movies.year,
        description: movies.description,
        image: movies.image,
        trailerLink: movies.trailerLink,
        nameRU: movies.nameRU,
        nameEN: movies.nameEN,
        thumbnail: movies.thumbnail,
        owner: movies.owner,
        id: movies.id,
        _id: movies._id,
        liked: movies.liked,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.errorsMessages.invalidData));
      } else {
        next(err);
      }
    });
};

exports.deleteMovie = (req, res, next) => {
  movie.findById(req.params._id)
    .then((data) => {
      if (data) {
        if (data.owner.equals(req.user._id)) {
          return data.deleteOne({})
            .then(() => res.send({ message: messages.successMessages.movieDeleteSuccess }));
        } next(new ForbiddenError(messages.errorsMessages.forbiddenMovieDelete));
      } return next(new NotFoundError(messages.errorsMessages.notfoundMovie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messages.errorsMessages.invalidData));
      } else {
        next(err);
      }
    });
};