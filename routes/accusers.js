const express = require('express');

const {
    getAccusers,
    getAccuser,
    addAccuser
    } = require('../controllers/accusers');

const router = express.Router({ mergeParams: true });

router.route('/')
    .get(getAccusers)
    .post(addAccuser);

router.route('/:id')
    .get(getAccuser);

module.exports = router;