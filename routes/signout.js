const signoutRoutes = require('express').Router();
const { logout } = require('../controllers/users');

signoutRoutes.post('/signout', logout);

exports.signoutRoutes = signoutRoutes;