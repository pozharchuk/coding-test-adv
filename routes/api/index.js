const express = require('express');

const router = express.Router();
const animals = require('./categories');

router.use('/categories', animals);

module.exports = router;
