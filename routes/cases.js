const express = require('express');
const { getCases,
    getCase,
    createCase,
    updateCase,
    deleteCase } = require('../controllers/cases');

const Case = require('../models/Case');

const advancedResults = require('../middleware/advancedResults');

//include other resource routers
const accuserRouter = require('./accusers');
const investigationReportRouter = require('./investigationReports');

const router = express.Router();

// Reroute into other resource router
router.use('/:caseId/accusers', accuserRouter);
router.use('/:caseId/investigationReports', investigationReportRouter);

router.route('/')
     .get(advancedResults(Case, 'accusers'),getCases)
     .post(createCase);
     
router
    .route('/:id')
    .get(getCase)
    .put(updateCase)
    .delete(deleteCase)

module.exports = router;