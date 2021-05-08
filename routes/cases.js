const express = require('express');
const { getCases,
    getCase,
    createCase,
    updateCase,
    deleteCase } = require('../controllers/cases');

//include other resource routers
const accuserRouter = require('./accusers');

const router = express.Router();

// Reroute into other resource router
router.use('/:caseId/accusers', accuserRouter);

router.route('/')
     .get(getCases)
     .post(createCase);
     
router
    .route('/:id')
    .get(getCase)
    .put(updateCase)
    .delete(deleteCase)

module.exports = router;