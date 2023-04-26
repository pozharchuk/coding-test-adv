const express = require('express');

const router = express.Router();
const categories = require('./categories');
const photos = require('./photos');

router.use('/categories', categories);
router.use('/photos', photos);

module.exports = router;
