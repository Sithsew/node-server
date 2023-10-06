const express = require('express');
const authorRoutes = require('./authorRoutes');
const bookRoutes = require('./bookRoutes');

const router = express.Router();

router.use('/authors', authorRoutes);
router.use('/books', bookRoutes);

module.exports = router;
