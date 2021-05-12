const express = require('express');

const {
    getIrs,
    getIr,
    addIr,
    UpdateIr,
    deleteIr
} = require('../controllers/investigationReports');
const Case = require('../models/Case');

const advancedResults = require('../middleware/advancedResults');
const InvestigationReport = require('../models/InvestigationReport');

const router = express.Router({ mergeParams: true });

router.route('/')
    .get(advancedResults(InvestigationReport, {
        path: 'case',
        select: 'name description'
    }),getIrs)
    .post(addIr);

router.route('/:id')
    .get(getIr)
    .put(UpdateIr)
    .delete(deleteIr);

module.exports = router;
