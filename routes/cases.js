const express = require('express');
const { getCases,
    getCase,
    createCase,
    updateCase,
    deleteCase } = require('../controllers/cases');

const Case = require('../models/Case');

const { protect } = require('../middleware/auth');
    // advance search middleware
const advancedResults = require('../middleware/advancedResults');

//include other resource routers
const accuserRouter = require('./accusers');
const investigationReportRouter = require('./investigationReports');


const router = express.Router();

// Reroute into other resource router
router.use('/:caseId/accusers', accuserRouter);
router.use('/:caseId/investigationReports', investigationReportRouter);

router.route('/')
    .get(advancedResults(Case, 'accuser'), getCases)
    .get(advancedResults(Case, 'investigationReport'), getCases)
    .post(protect, createCase)
    
   
     
router
    .route('/:id')
    .get(getCase)
    .put(protect, updateCase)
    .delete(protect, deleteCase)

module.exports = router;