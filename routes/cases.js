const express = require('express');
const { getCases,
    getCase,
    createCase,
    updateCase,
    deleteCase } = require('../controllers/cases');

const Case = require('../models/Case');

const { protect, authorize } = require('../middleware/auth');
    // advance search middleware
const advancedResults = require('../middleware/advancedResults');

//include other resource routers
const accuserRouter = require('./accusers');
const investigationReportRouter = require('./investigationReports');
const reviewRouter = require('./reviews');


const router = express.Router();

// Reroute into other resource router
router.use('/:caseId/accusers', accuserRouter);
router.use('/:caseId/investigationReports', investigationReportRouter);
router.use('/:caseId/reviews', reviewRouter);

router.route('/')
    .get(advancedResults(Case, 'accuser'), getCases)
    .get(advancedResults(Case, 'investigationReport'), getCases)
    .post(protect, authorize('registra', 'OCCID','investigator','admin'), createCase)
    
   
     
router
    .route('/:id')
    .get(getCase)
    .put(protect, authorize('registra', 'OCCID','investigator','admin'), updateCase)
    .delete(protect, authorize('registra', 'OCCID','investigator','admin'), deleteCase)

module.exports = router;