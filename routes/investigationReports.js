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

const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(advancedResults(InvestigationReport, {
        path: 'case',
        select: 'name description'
    }),getIrs)
    .post(protect, authorize('publisher', 'admin'), addIr);

router.route('/:id')
    .get(getIr)
    .put(protect, authorize('publisher', 'admin'), UpdateIr)
    .delete(protect, authorize('publisher', 'admin'), deleteIr);

module.exports = router;
