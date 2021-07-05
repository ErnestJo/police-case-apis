const express = require('express');

const {
    getIrs,
    getIr,
    addIr,
    UpdateIr,
    deleteIr,
    irPhotoUpload
} = require('../controllers/investigationReports');
const Case = require('../models/Case');

const advancedResults = require('../middleware/advancedResults');
const InvestigationReport = require('../models/InvestigationReport');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/:id/photo').put(irPhotoUpload);

router.route('/')
    .get(advancedResults(InvestigationReport, {
        path: 'case',
        select: 'caseNumber'
    }),getIrs)
    .post(protect, authorize('registra', 'OCCID','investigator','admin'), addIr);

router.route('/:id')
    .get(getIr)
    .put(protect, authorize('registra', 'OCCID','investigator','admin'), UpdateIr)
    .delete(protect, authorize('registra', 'OCCID','investigator','admin'), deleteIr);

module.exports = router;
