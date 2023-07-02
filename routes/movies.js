const express = require('express');
const movieRoutes = require('express').Router();

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

const {
  validateDeleteMovie,
  validateMovieCreate,
} = require('../middlewares/validators');

movieRoutes.get('/movies', getMovies);
movieRoutes.delete('/movies/:_id', validateDeleteMovie, deleteMovie);
movieRoutes.post('/movies', express.json(), validateMovieCreate, createMovie);

exports.movieRoutes = movieRoutes;
