const express = require('express');

const {
    getAccusers,
    getAccuser
    } = require('../controllers/accusers');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAccusers);

router.route('/:id').get(getAccuser);

module.exports = router;