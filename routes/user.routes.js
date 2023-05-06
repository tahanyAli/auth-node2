'use strict';

const router = require('express').Router();
const { saveUser } = require('../middlewares/userAuth');
const { signup, login, allUser } = require('../controllers/user.controller')
//router level middleware
const bearerAuth = require('../middlewares/bearerAuth');
router.post('/signup', saveUser , signup);
router.post('/login', login)
router.get('/users',bearerAuth, allUser)

module.exports = router;