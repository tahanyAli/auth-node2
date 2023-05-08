'use strict';
const router = require('express').Router();
const { getAllNews, createNews, deleteNew } = require('../controllers/news.controller');
const bearerAuth = require('../middlewares/bearerAuth');

router.get('/news', getAllNews);
router.post('/news', createNews);
router.delete('/news/:id',bearerAuth, deleteNew);

module.exports = router