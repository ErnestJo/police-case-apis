const express = require('express');

const {
    getAccusers
    } = require('../controllers/accusers');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAccusers);

module.exports = router;