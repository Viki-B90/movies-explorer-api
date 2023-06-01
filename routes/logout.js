const router = require('express').Router();
const { logout } = require('../controllers/users');

router.get('/signout', logout);

module.exports = router;