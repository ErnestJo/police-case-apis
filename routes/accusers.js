const express = require('express');

const {
    getAccusers,
    getAccuser,
    addAccuser,
    UpdateAccuser,
    deleteAccuser
    } = require('../controllers/accusers');

const router = express.Router({ mergeParams: true });

router.route('/')
    .get(getAccusers)
    .post(addAccuser);

router.route('/:id')
    .get(getAccuser)
    .put(UpdateAccuser)
    .delete(deleteAccuser);

module.exports = router;