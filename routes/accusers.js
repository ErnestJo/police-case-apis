const express = require('express');

const {
    getAccusers
    } = require('../controllers/accusers');

const router = express.Router();

router.route('/').get(getAccusers);

module.exports = router;