const express = require('express');

const {
    getAccusers,
    getAccuser,
    addAccuser,
    UpdateAccuser,
    deleteAccuser
} = require('../controllers/accusers');
const Case = require('../models/Case');

const advancedResults = require('../middleware/advancedResults');
const Accuser = require('../models/Accuser');

const router = express.Router({ mergeParams: true });

router.route('/')
    .get(advancedResults(Accuser, {
        path: 'case',
        select: 'name description'
    }),getAccusers)
    .post(addAccuser);

router.route('/:id')
    .get(getAccuser)
    .put(UpdateAccuser)
    .delete(deleteAccuser);

module.exports = router;