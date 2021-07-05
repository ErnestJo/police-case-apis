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

const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(advancedResults(Accuser, {
        path: 'case',
        select: 'caseNumber'
    }),getAccusers)
    .post(protect, authorize('registra', 'OCCID','investigator','admin'), addAccuser);

router.route('/:id')
    .get(getAccuser)
    .put(protect, authorize('registra', 'OCCID','investigator','admin'), UpdateAccuser)
    .delete(protect, authorize('registra', 'OCCID','investigator','admin'), deleteAccuser);

module.exports = router;