const express = require('express');
const router =  express.Router();

const {BookResources} = require('../resources');

router.use('/books', BookResources);

module.exports = router;